/**
 * Generate icon React components from Figma pages.
 *
 * Each target page is expected to contain only 14x14 icon frames. Each frame is
 * exported from Figma as SVG, parsed to a hast tree, converted to a JSX estree
 * via `hast-util-to-estree`, serialized back to source with `estree-util-to-js`,
 * and written as a weighted component whose SVG shapes live inside `<IconWrapper>`.
 *
 * Run (Node >= 23.6 strips TS types natively):
 *   FIGMA_TOKEN=xxx FIGMA_FILE_KEY=yyy node scripts/generate-icons.ts
 *
 * Env / args:
 *   FIGMA_TOKEN      (required)  Figma personal access token.
 *   FIGMA_FILE_KEY   (required)  File key (the part after /file/ or /design/ in the URL).
 *   FIGMA_PAGES      (optional)  Comma-separated weight=page pairs. Default: "normal=normal,bold=bold".
 *                                Example: "normal=Icons,bold=Icons Bold".
 *   --keep-colors    (optional)  Keep Figma's literal fill/stroke colors instead of
 *                                rewriting them to `currentColor`.
 *   --out <dir>      (optional)  Output dir. Default: ui/src/components/icon/static.
 */

import { writeFile, mkdir, readdir, readFile, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fromHtml } from "hast-util-from-html";
import { toEstree } from "hast-util-to-estree";
import { toJs, jsx } from "estree-util-to-js";

const FIGMA_API = "https://api.figma.com/v1";
const DEFAULT_VIEWBOX = "0 0 18 18"; // IconWrapper's default; omit the prop when it matches
const EXPORT_CHUNK = 100; // max node ids per /images request
const DEFAULT_WEIGHTS = ["normal", "bold"] as const;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

// Load FIGMA_TOKEN / FIGMA_FILE_KEY / FIGMA_PAGE from .env at the repo root.
try {
  process.loadEnvFile(path.join(REPO_ROOT, ".env"));
} catch {
  // No .env present — fall back to existing process env.
}

type FigmaNode = {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
};

function parseArgs() {
  const argv = process.argv.slice(2);
  let keepColors = false;
  let indexOnly = false;
  let out = path.join(REPO_ROOT, "ui/src/components/icon/static");
  let pagesArg = process.env.FIGMA_PAGES ?? "normal=normal,bold=bold";

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--keep-colors") keepColors = true;
    else if (arg === "--index-only") indexOnly = true;
    else if (arg === "--out") out = path.resolve(argv[++i] ?? out);
    else if (arg === "--pages") pagesArg = argv[++i] ?? pagesArg;
  }

  const token = process.env.FIGMA_TOKEN;
  const fileKey = process.env.FIGMA_FILE_KEY;
  const pages = parsePages(pagesArg);

  // Figma creds are only needed for a full run, not for rebuilding the index.
  if (!indexOnly && (!token || !fileKey)) {
    console.error(
      "Missing config. Set FIGMA_TOKEN and FIGMA_FILE_KEY.\n" +
        "Usage: FIGMA_TOKEN=xxx FIGMA_FILE_KEY=yyy node scripts/generate-icons.ts"
    );
    process.exit(1);
  }

  return { token, fileKey, pages, keepColors, indexOnly, out };
}

function parsePages(input: string) {
  const pages = input
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [weight, ...pageParts] = part.split("=");
      const page = pageParts.join("=").trim();
      return {
        weight: weight.trim(),
        pageName: page || weight.trim(),
      };
    });

  if (pages.length === 0) {
    throw new Error("No icon pages configured. Use FIGMA_PAGES or --pages.");
  }
  for (const page of pages) {
    if (!/^[a-z][a-z0-9-]*$/.test(page.weight)) {
      throw new Error(`Invalid icon weight "${page.weight}". Use lowercase kebab-case.`);
    }
  }
  return pages;
}

async function figma(token: string, url: string) {
  const res = await fetch(url, { headers: { "X-Figma-Token": token } });
  if (!res.ok) {
    throw new Error(`Figma API ${res.status} ${res.statusText}: ${await res.text()}`);
  }
  return res.json();
}

/** depth=2 returns document -> pages -> top-level frames, without deep geometry. */
async function getIconFrames(token: string, fileKey: string, pageName: string) {
  const data = await figma(token, `${FIGMA_API}/files/${fileKey}?depth=2`);
  const pages: FigmaNode[] = data.document?.children ?? [];
  const page = pages.find((p) => p.type === "CANVAS" && p.name === pageName);

  if (!page) {
    const names = pages.map((p) => `"${p.name}"`).join(", ");
    throw new Error(`Page "${pageName}" not found. Available pages: ${names}`);
  }

  // Each direct child of the page is one exportable icon node.
  const frames = (page.children ?? []).filter(
    (n) => n.type === "FRAME" || n.type === "COMPONENT" || n.type === "INSTANCE"
  );
  if (frames.length === 0) {
    throw new Error(`Page "${pageName}" has no FRAME/COMPONENT/INSTANCE children to export.`);
  }
  return frames;
}

/** Ask Figma to render each node as SVG; returns { nodeId: temporaryUrl }. */
async function getSvgUrls(token: string, fileKey: string, ids: string[]) {
  const urls: Record<string, string> = {};
  for (let i = 0; i < ids.length; i += EXPORT_CHUNK) {
    const chunk = ids.slice(i, i + EXPORT_CHUNK);
    const params = new URLSearchParams({
      ids: chunk.join(","),
      format: "svg",
      svg_outline_text: "false",
      svg_simplify_stroke: "true",
    });
    const data = await figma(token, `${FIGMA_API}/images/${fileKey}?${params}`);
    if (data.err) throw new Error(`Figma image export error: ${data.err}`);
    Object.assign(urls, data.images);
  }
  return urls;
}

/** "Arrow / Up", "arrowUp", "arrow_up" -> { kebab: "arrow-up", pascal: "ArrowUp" }. */
function names(raw: string) {
  const words = raw
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2") // split camelCase
    .replace(/[^a-zA-Z0-9]+/g, " ") // non-alphanumeric -> space
    .trim()
    .split(/\s+/)
    .map((w) => w.toLowerCase())
    .filter(Boolean);

  if (words.length === 0) throw new Error(`Cannot derive a name from "${raw}"`);

  const kebab = words.join("-");
  let pascal = words.map((w) => w[0].toUpperCase() + w.slice(1)).join("");
  if (/^[0-9]/.test(pascal)) pascal = `Icon${pascal}`; // valid JS identifier
  return { kebab, pascal };
}

/**
 * Walk a hast tree, rewriting concrete fill/stroke colors to `currentColor`.
 * Also strips the inline `style` attribute: Figma duplicates the color there
 * (e.g. `style="stroke:color(display-p3 …)"`), which would override the
 * attribute and leak literal P3 colors into the output.
 */
function recolor(node: any) {
  if (node.type === "element" && node.properties) {
    for (const prop of ["fill", "stroke"] as const) {
      const value = node.properties[prop];
      if (typeof value === "string" && value.toLowerCase() !== "none") {
        node.properties[prop] = "currentColor";
      }
    }
    delete node.properties.style;
  }
  for (const child of node.children ?? []) recolor(child);
}

/** True for whitespace-only text / `{"\n"}` expression-container children. */
function isBlankChild(c: any): boolean {
  if (c.type === "JSXText") return c.value.trim() === "";
  if (
    c.type === "JSXExpressionContainer" &&
    c.expression?.type === "Literal" &&
    typeof c.expression.value === "string"
  ) {
    return c.expression.value.trim() === "";
  }
  return false;
}

/** Serialize a single estree JSX node to source, dropping the trailing `;`. */
function serializeJsx(expression: any) {
  const program = {
    type: "Program",
    sourceType: "module",
    body: [{ type: "ExpressionStatement", expression }],
  };
  // @ts-ignore - jsx handlers extend the generator for JSX nodes
  return toJs(program, { handlers: jsx }).value.replace(/;\s*$/, "").trim();
}

/** SVG string -> the shapes inside <svg> as indented JSX, plus its viewBox. */
function svgToJsx(svg: string, keepColors: boolean): { viewBox: string; children: string } {
  const root = fromHtml(svg, { fragment: true, space: "svg" });
  const svgEl = (root.children as any[]).find(
    (n) => n.type === "element" && n.tagName === "svg"
  );
  if (!svgEl) throw new Error("No <svg> element found in export");

  const viewBox = typeof svgEl.properties?.viewBox === "string" ? svgEl.properties.viewBox : DEFAULT_VIEWBOX;

  if (!keepColors) recolor(svgEl);

  // Convert only the children of <svg> (the wrapper is provided by IconWrapper).
  const inner = { type: "root", children: svgEl.children };
  const estree: any = toEstree(inner, { space: "svg" });
  const expression = estree.body[0].expression;
  const childNodes =
    expression.type === "JSXFragment" ? expression.children : [expression];

  const children = childNodes
    .filter((c: any) => !isBlankChild(c))
    .map((c: any) =>
      serializeJsx(c)
        .split("\n")
        .map((l) => "      " + l) // indent inside the arrow's return
        .join("\n")
    )
    .join("\n");

  return { viewBox, children };
}

function componentSource(pascal: string, viewBox: string, children: string): string {
  // Match the hand-written icons: only set viewBox when it differs from the
  // IconWrapper default, otherwise the prop is redundant.
  const viewBoxProp = viewBox === DEFAULT_VIEWBOX ? "" : `viewBox="${viewBox}" `;
  return `import { IconWrapper } from "../../icon-wrapper";
import type { IconProps } from "../../types";

export const ${pascal} = (props: IconProps) => {
  return (
    <IconWrapper ${viewBoxProp}{...props}>
${children}
    </IconWrapper>
  );
};
`;
}

/**
 * Alternate public names for the same glyph. The Figma pages carry both names,
 * so a full run regenerates the alias files; pruning deletes an alias file
 * only while its body still matches the canonical one (the frames can diverge
 * in Figma), and the registry then maps the alias name onto the canonical
 * component — same public name union, one module per glyph.
 */
const ALIAS_NAMES: Record<string, string> = {
  "x-mark": "xmark",
  "info-circle-xmark": "circle-xmark",
};

/** Icon sources are equal when only the exported component name differs. */
function sameGlyph(a: string, b: string): boolean {
  const strip = (src: string) => src.replace(/export const \w+ =/, "export const _ =");
  return strip(a) === strip(b);
}

/**
 * Remove redundant generated files before building the registry: alias-named
 * duplicates of canonical icons, and non-normal weight files byte-identical to
 * their normal counterpart (`Icon` falls back to normal for missing weights).
 */
async function pruneRedundantIcons(staticDir: string) {
  const weights = (await readdir(staticDir, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  for (const weight of weights) {
    const weightDir = path.join(staticDir, weight);

    for (const [alias, canonical] of Object.entries(ALIAS_NAMES)) {
      const aliasPath = path.join(weightDir, `${alias}.tsx`);
      const aliasSrc = await readFile(aliasPath, "utf8").catch(() => null);
      if (aliasSrc === null) continue;
      const canonicalSrc = await readFile(path.join(weightDir, `${canonical}.tsx`), "utf8").catch(
        () => null
      );
      if (canonicalSrc !== null && sameGlyph(aliasSrc, canonicalSrc)) {
        await rm(aliasPath);
      } else {
        console.warn(
          `  ! keeping ${weight}/${alias}.tsx — it no longer matches ${canonical}.tsx`
        );
      }
    }

    if (weight === "normal") continue;
    for (const file of (await readdir(weightDir)).filter((f) => f.endsWith(".tsx"))) {
      const weighted = await readFile(path.join(weightDir, file), "utf8");
      const normal = await readFile(path.join(staticDir, "normal", file), "utf8").catch(
        () => null
      );
      if (weighted === normal) {
        await rm(path.join(weightDir, file));
        console.log(`  - pruned ${weight}/${file} (identical to normal)`);
      }
    }
  }
}

/** A bare identifier can be an unquoted object key; anything else needs quotes. */
function mapKey(kebab: string): string {
  return /^[a-z][a-zA-Z0-9]*$/.test(kebab) ? kebab : `"${kebab}"`;
}

/** "lock-locked" -> "LockLocked", for building unique per-weight import aliases. */
function pascalCase(kebab: string): string {
  return kebab
    .split("-")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join("");
}

/**
 * (Re)write the generated icon registry by scanning static/<weight> dirs.
 * Every `*.tsx` whose exported component we can read becomes an entry, so adding
 * an icon is just dropping a file in a weight dir and re-running — no hand-editing.
 *
 * Only the name→component map lives here; index.tsx (hand-written, stable)
 * imports it to build the `Icon` component, types, and re-exports. Keeping them
 * split means this churning file stays tiny and index.tsx never gets rewritten.
 */
async function writeRegistry(staticDir: string) {
  const existingWeights = (await readdir(staticDir, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  const weights = Array.from(new Set([...DEFAULT_WEIGHTS, ...existingWeights])).sort();

  const registry: Record<string, { kebab: string; component: string }[]> = {};

  for (const weight of weights) {
    const weightDir = path.join(staticDir, weight);
    await mkdir(weightDir, { recursive: true });
    const dir = await readdir(weightDir);
    const entries: { kebab: string; component: string }[] = [];

    for (const file of dir.filter((f) => f.endsWith(".tsx")).sort()) {
      const kebab = file.replace(/\.tsx$/, "");
      const src = await readFile(path.join(weightDir, file), "utf8");
      const match = src.match(/export const (\w+)/);
      if (!match) {
        console.warn(`  ! ${weight}/${file} has no \`export const\`; omitting from registry`);
        continue;
      }
      entries.push({ kebab, component: match[1] });
    }
    entries.sort((a, b) => a.kebab.localeCompare(b.kebab));
    registry[weight] = entries;
  }

  const staticName = path.basename(staticDir);
  // The same icon exists in every weight under the same exported name (e.g.
  // `ArrowDown`), so alias each import by weight to keep local bindings unique.
  const localName = (weight: string, component: string) =>
    `${pascalCase(weight)}${component}`;
  const imports = Object.entries(registry)
    .flatMap(([weight, entries]) =>
      entries.map(
        (e) =>
          `import { ${e.component} as ${localName(weight, e.component)} } from "./${staticName}/${weight}/${e.kebab}";`
      )
    )
    .join("\n");
  const maps = Object.entries(registry)
    .map(([weight, entries]) => {
      // Alias names share the canonical entry's component (and its import).
      const byKebab = new Map(entries.map((e) => [e.kebab, e]));
      const mapEntries = [...entries];
      for (const [alias, canonical] of Object.entries(ALIAS_NAMES)) {
        const target = byKebab.get(canonical);
        if (target && !byKebab.has(alias)) {
          mapEntries.push({ kebab: alias, component: target.component });
        }
      }
      mapEntries.sort((a, b) => a.kebab.localeCompare(b.kebab));
      const map = mapEntries
        .map((e) => `    ${mapKey(e.kebab)}: ${localName(weight, e.component)},`)
        .join("\n");
      return `  ${mapKey(weight)}: {\n${map}\n  },`;
    })
    .join("\n");
  const count = Object.values(registry).reduce((total, entries) => total + entries.length, 0);

  const source = `// AUTO-GENERATED by scripts/generate-icons.ts — do not edit by hand.
// Add an icon by placing its component in ./${staticName}/<weight> and re-running:
//   pnpm generate-icons              regenerate from Figma, then rebuild this file
//   pnpm generate-icons:index        rebuild this file from ./${staticName} only
${imports}

export const icons = {
${maps}
} as const;
`;

  const registryPath = path.join(path.dirname(staticDir), "registry.ts");
  await writeFile(registryPath, source, "utf8");
  console.log(`\nWrote ${path.relative(REPO_ROOT, registryPath)} (${count} icon(s), ${weights.length} weight(s)).`);
}

async function main() {
  const { token, fileKey, pages, keepColors, indexOnly, out } = parseArgs();

  // --index-only: skip Figma entirely, just rebuild the registry from ./static.
  if (indexOnly) {
    await mkdir(out, { recursive: true });
    await pruneRedundantIcons(out);
    await writeRegistry(out);
    return;
  }

  await mkdir(out, { recursive: true });

  for (const page of pages) {
    const weightDir = path.join(out, page.weight);
    await mkdir(weightDir, { recursive: true });

    console.log(`Fetching page "${page.pageName}" as "${page.weight}" from file ${fileKey}…`);
    const frames = await getIconFrames(token!, fileKey!, page.pageName);
    console.log(`Found ${frames.length} icon frame(s). Requesting SVG export…`);

    const urls = await getSvgUrls(token!, fileKey!, frames.map((f) => f.id));

    // Download + transform each icon. Parallel within a single page.
    await Promise.all(
      frames.map(async (frame) => {
        const url = urls[frame.id];
        if (!url) {
          console.warn(`  ! No export URL for "${frame.name}" (${frame.id}); skipping`);
          return;
        }

        const res = await fetch(url);
        if (!res.ok) {
          console.warn(`  ! Failed to download "${frame.name}": ${res.status}; skipping`);
          return;
        }
        const svg = await res.text();

        const { kebab, pascal } = names(frame.name);
        const { viewBox, children } = svgToJsx(svg, keepColors);
        const file = path.join(weightDir, `${kebab}.tsx`);
        await writeFile(file, componentSource(pascal, viewBox, children), "utf8");

        console.log(`  ✓ ${page.weight}/${kebab}.tsx  (${pascal})`);
      })
    );
  }

  // Rebuild the registry from everything now in ./static (newly written + existing).
  await pruneRedundantIcons(out);
  await writeRegistry(out);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
