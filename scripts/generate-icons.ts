/**
 * Generate icon React components from a Figma page.
 *
 * The target page is expected to contain only 18x18 icon frames. Each frame is
 * exported from Figma as SVG, parsed to a hast tree, converted to a JSX estree
 * via `hast-util-to-estree`, serialized back to source with `estree-util-to-js`,
 * and written as a component whose SVG shapes live inside `<IconWrapper>`.
 *
 * Run (Node >= 23.6 strips TS types natively):
 *   FIGMA_TOKEN=xxx FIGMA_FILE_KEY=yyy node scripts/generate-icons.ts
 *
 * Env / args:
 *   FIGMA_TOKEN      (required)  Figma personal access token.
 *   FIGMA_FILE_KEY   (required)  File key (the part after /file/ or /design/ in the URL).
 *   FIGMA_PAGE       (optional)  Name of the page holding the icon frames. Default: "normal".
 *   --page <name>    (optional)  Same as FIGMA_PAGE.
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
const DEFAULT_PAGE = "normal";
const EXPORT_CHUNK = 100; // max node ids per /images request
const DOWNLOAD_CONCURRENCY = 8; // SVG downloads in flight
const FETCH_TIMEOUT_MS = 30_000;
const FETCH_ATTEMPTS = 4; // total tries per request on 429 / 5xx / network errors

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
  let page = process.env.FIGMA_PAGE || DEFAULT_PAGE;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--keep-colors") keepColors = true;
    else if (arg === "--index-only") indexOnly = true;
    else if (arg === "--out") out = path.resolve(argv[++i] ?? out);
    else if (arg === "--page") page = argv[++i] ?? page;
  }

  const token = process.env.FIGMA_TOKEN;
  const fileKey = process.env.FIGMA_FILE_KEY;

  // Figma creds are only needed for a full run, not for rebuilding the index.
  if (!indexOnly && (!token || !fileKey)) {
    console.error(
      "Missing config. Set FIGMA_TOKEN and FIGMA_FILE_KEY.\n" +
        "Usage: FIGMA_TOKEN=xxx FIGMA_FILE_KEY=yyy node scripts/generate-icons.ts"
    );
    process.exit(1);
  }

  return { token, fileKey, page, keepColors, indexOnly, out };
}

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** `Retry-After` as milliseconds, from either a delay-seconds or an HTTP-date value. */
function retryAfterMs(res: Response): number | null {
  const header = res.headers.get("retry-after");
  if (!header) return null;
  const seconds = Number(header);
  if (Number.isFinite(seconds)) return Math.max(0, seconds * 1000);
  const date = Date.parse(header);
  return Number.isNaN(date) ? null : Math.max(0, date - Date.now());
}

/**
 * `fetch` with a per-request timeout, retrying 429 / 5xx responses and network
 * errors with exponential backoff (honouring `Retry-After` when present).
 */
async function fetchWithRetry(url: string, init: RequestInit = {}): Promise<Response> {
  for (let attempt = 1; ; attempt++) {
    let res: Response | undefined;
    let failure: string;
    try {
      res = await fetch(url, { ...init, signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
      if (res.status !== 429 && res.status < 500) return res;
      failure = `HTTP ${res.status}`;
    } catch (err) {
      failure = errorMessage(err);
    }
    if (attempt === FETCH_ATTEMPTS) {
      if (res) return res; // the caller reports the final status
      throw new Error(`${failure} after ${FETCH_ATTEMPTS} attempts: ${url}`);
    }
    const delay = (res && retryAfterMs(res)) ?? 500 * 2 ** (attempt - 1);
    await res?.body?.cancel(); // release the connection before retrying
    console.warn(
      `  ! ${failure} from ${new URL(url).host}; retrying in ${delay}ms (${attempt}/${FETCH_ATTEMPTS})`
    );
    await sleep(delay);
  }
}

/** Run `task` over `items` with at most `limit` in flight; settles like `Promise.allSettled`. */
async function mapPool<T, R>(
  items: T[],
  limit: number,
  task: (item: T) => Promise<R>
): Promise<PromiseSettledResult<R>[]> {
  const results: PromiseSettledResult<R>[] = [];
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const index = next++;
      try {
        results[index] = { status: "fulfilled", value: await task(items[index]) };
      } catch (reason) {
        results[index] = { status: "rejected", reason };
      }
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

async function figma(token: string, url: string): Promise<any> {
  const res = await fetchWithRetry(url, { headers: { "X-Figma-Token": token } });
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
function serializeJsx(expression: any): string {
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
  const inner: any = { type: "root", children: svgEl.children };
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
  return `import { IconWrapper } from "../icon-wrapper";
import type { IconProps } from "../types";

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
 * Alternate public names for the same glyph. The Figma page carries both names,
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

/** Remove alias-named duplicates of canonical icons before building the registry. */
async function pruneAliasIcons(staticDir: string) {
  for (const [alias, canonical] of Object.entries(ALIAS_NAMES)) {
    const aliasPath = path.join(staticDir, `${alias}.tsx`);
    const aliasSrc = await readFile(aliasPath, "utf8").catch(() => null);
    if (aliasSrc === null) continue;
    const canonicalSrc = await readFile(path.join(staticDir, `${canonical}.tsx`), "utf8").catch(
      () => null
    );
    if (canonicalSrc !== null && sameGlyph(aliasSrc, canonicalSrc)) {
      await rm(aliasPath);
    } else {
      console.warn(`  ! keeping ${alias}.tsx — it no longer matches ${canonical}.tsx`);
    }
  }
}

/** A bare identifier can be an unquoted object key; anything else needs quotes. */
function mapKey(kebab: string): string {
  return /^[a-z][a-zA-Z0-9]*$/.test(kebab) ? kebab : `"${kebab}"`;
}

/**
 * (Re)write the generated icon registry by scanning the static dir.
 * Every `*.tsx` whose exported component we can read becomes an entry, so adding
 * an icon is just dropping a file in the dir and re-running — no hand-editing.
 *
 * Only the name→component map lives here; index.tsx (hand-written, stable)
 * imports it to build the `Icon` component, types, and re-exports. Keeping them
 * split means this churning file stays tiny and index.tsx never gets rewritten.
 */
async function writeRegistry(staticDir: string) {
  const entries: { kebab: string; component: string }[] = [];

  for (const file of (await readdir(staticDir)).filter((f) => f.endsWith(".tsx")).sort()) {
    const kebab = file.replace(/\.tsx$/, "");
    const src = await readFile(path.join(staticDir, file), "utf8");
    const match = src.match(/export const (\w+)/);
    if (!match) {
      console.warn(`  ! ${file} has no \`export const\`; omitting from registry`);
      continue;
    }
    entries.push({ kebab, component: match[1] });
  }
  entries.sort((a, b) => a.kebab.localeCompare(b.kebab));

  const staticName = path.basename(staticDir);
  const imports = entries
    .map((e) => `import { ${e.component} } from "./${staticName}/${e.kebab}";`)
    .join("\n");

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
  const map = mapEntries.map((e) => `  ${mapKey(e.kebab)}: ${e.component},`).join("\n");

  const source = `// AUTO-GENERATED by scripts/generate-icons.ts — do not edit by hand.
// Add an icon by placing its component in ./${staticName} and re-running:
//   pnpm generate-icons              regenerate from Figma, then rebuild this file
//   pnpm generate-icons:index        rebuild this file from ./${staticName} only
${imports}

export const icons = {
${map}
} as const;
`;

  const registryPath = path.join(path.dirname(staticDir), "registry.ts");
  await writeFile(registryPath, source, "utf8");
  console.log(`\nWrote ${path.relative(REPO_ROOT, registryPath)} (${entries.length} icon(s)).`);
}

async function main() {
  const { token, fileKey, page, keepColors, indexOnly, out } = parseArgs();
  await mkdir(out, { recursive: true });

  // --index-only: skip Figma entirely, just rebuild the registry from ./static.
  if (indexOnly) {
    await pruneAliasIcons(out);
    await writeRegistry(out);
    return;
  }

  const failures: string[] = [];

  try {
    console.log(`Fetching page "${page}" from file ${fileKey}…`);
    const frames = await getIconFrames(token!, fileKey!, page);
    console.log(`Found ${frames.length} icon frame(s). Requesting SVG export…`);

    // Resolve file names up front so two frames can't silently overwrite one file.
    const icons: { frame: FigmaNode; kebab: string; pascal: string }[] = [];
    const framesByKebab = new Map<string, FigmaNode[]>();
    for (const frame of frames) {
      try {
        const { kebab, pascal } = names(frame.name);
        icons.push({ frame, kebab, pascal });
        framesByKebab.set(kebab, [...(framesByKebab.get(kebab) ?? []), frame]);
      } catch (err) {
        failures.push(`"${frame.name}" — ${errorMessage(err)}`);
      }
    }
    const collisions = [...framesByKebab].filter(([, group]) => group.length > 1);
    if (collisions.length > 0) {
      const list = collisions
        .map(([kebab, group]) => `  ${kebab}.tsx <- ${group.map((f) => `"${f.name}"`).join(", ")}`)
        .join("\n");
      throw new Error(
        `Page "${page}": several frames normalize to the same file name. Rename them in Figma:\n${list}`
      );
    }

    const urls = await getSvgUrls(token!, fileKey!, icons.map((i) => i.frame.id));

    // Download + transform each icon, a few at a time; one failure doesn't stop the rest.
    const results = await mapPool(icons, DOWNLOAD_CONCURRENCY, async ({ frame, kebab, pascal }) => {
      const url = urls[frame.id];
      if (!url) throw new Error("Figma returned no export URL");

      const res = await fetchWithRetry(url);
      if (!res.ok) throw new Error(`download failed: HTTP ${res.status}`);
      const svg = await res.text();

      const { viewBox, children } = svgToJsx(svg, keepColors);
      const file = path.join(out, `${kebab}.tsx`);
      await writeFile(file, componentSource(pascal, viewBox, children), "utf8");

      console.log(`  ✓ ${kebab}.tsx  (${pascal})`);
    });
    results.forEach((result, i) => {
      if (result.status === "rejected") {
        const { frame, kebab } = icons[i];
        failures.push(`${kebab}.tsx ("${frame.name}") — ${errorMessage(result.reason)}`);
      }
    });
  } finally {
    // Whatever happened above, leave ./static and registry.ts consistent with each other.
    await pruneAliasIcons(out);
    await writeRegistry(out);
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length} icon(s) failed; any previous file for them was kept and re-registered:`);
    for (const failure of failures) console.error(`  ✗ ${failure}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
