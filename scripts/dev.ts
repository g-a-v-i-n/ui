/**
 * Dev loop for working on the library against the docs site.
 *
 * Builds ui in place (no clean), regenerates the props tables, and starts the
 * preview's Vite dev server, then watches ui/src. A change rebuilds the
 * library in place — tsc for .ts/.tsx (plus the props tables, which read the
 * sources), a copy of the changed files for .css — so Vite reloads only what
 * changed instead of tripping over missing files. Extra arguments are passed
 * to vite:
 *
 *   pnpm dev --port 5180
 */

import { spawn } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, watch } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const UI_SRC = path.join(ROOT, "ui/src");
const UI_DIST = path.join(ROOT, "ui/dist");
const PREVIEW = path.join(ROOT, "preview");
const VITE = path.join(PREVIEW, "node_modules/.bin/vite");
const DEBOUNCE_MS = 150;

function log(message: string): void {
  console.log(`[dev] ${message}`);
}

/* Run a command to completion with inherited output; resolves to whether it succeeded. */
function run(command: string, args: string[]): Promise<boolean> {
  return new Promise((resolve) => {
    const child = spawn(command, args, { cwd: ROOT, stdio: "inherit" });
    child.on("error", (error) => {
      console.error(error);
      resolve(false);
    });
    child.on("exit", (code) => resolve(code === 0));
  });
}

const pnpm = (...args: string[]) => run("pnpm", ["--silent", ...args]);

/* Mirror the changed stylesheets into dist one by one. The package's build:css
   rewrites every CSS file, which makes Vite invalidate every component. */
function copyStyles(files: string[]): boolean {
  let ok = true;
  for (const file of files) {
    const source = path.join(UI_SRC, file);
    // A deleted file leaves a stale copy behind until the next full build.
    if (!existsSync(source)) continue;
    try {
      const target = path.join(UI_DIST, file);
      mkdirSync(path.dirname(target), { recursive: true });
      copyFileSync(source, target);
    } catch (error) {
      console.error(error);
      ok = false;
    }
  }
  return ok;
}

async function rebuild(changed: Set<string>): Promise<void> {
  const files = [...changed];
  const scripts = files.filter((file) => /\.tsx?$/.test(file));
  const styles = files.filter((file) => file.endsWith(".css"));
  const shown = files.slice(0, 3).join(", ") + (files.length > 3 ? ", …" : "");
  log(`${files.length} file${files.length === 1 ? "" : "s"} changed (${shown}), rebuilding ui`);

  const started = Date.now();
  let ok = true;
  if (scripts.length > 0) {
    ok = (await pnpm("--filter", "ui", "build:js")) && ok;
    ok = (await pnpm("generate-docs-props")) && ok;
  }
  if (styles.length > 0) ok = copyStyles(styles) && ok;
  const seconds = ((Date.now() - started) / 1000).toFixed(1);
  log(ok ? `ui rebuilt in ${seconds}s` : `ui rebuild finished with errors in ${seconds}s`);
}

/* Changes are debounced and coalesced: edits that land during a rebuild are
   collected and built together once it finishes. */
let pending = new Set<string>();
let timer: NodeJS.Timeout | undefined;
let building = false;

function schedule(): void {
  clearTimeout(timer);
  timer = setTimeout(flush, DEBOUNCE_MS);
}

async function flush(): Promise<void> {
  if (building) return;
  building = true;
  const changed = pending;
  pending = new Set();
  await rebuild(changed);
  building = false;
  if (pending.size > 0) schedule();
}

const watcher = watch(UI_SRC, { recursive: true }, (_event, filename) => {
  if (typeof filename !== "string" || !/\.(tsx?|css)$/.test(filename)) return;
  pending.add(filename);
  schedule();
});

building = true;
log("building ui");
// Not the package's `build`: its clean step deletes every dist file, and macOS
// FSEvents replays those deletes into Vite's watcher moments later, so the
// preview briefly fails to resolve `ui/*` imports right after startup.
// Rewriting in place leaves nothing to replay. `pnpm build` still cleans.
const built = (await pnpm("--filter", "ui", "build:js")) && (await pnpm("--filter", "ui", "build:css"));
if (!built) log("ui build failed; starting the preview anyway");
await pnpm("generate-docs-props");
building = false;
if (pending.size > 0) schedule();

log(`watching ${path.relative(ROOT, UI_SRC)}; starting preview`);
let shuttingDown = false;
const vite = spawn(VITE, process.argv.slice(2), { cwd: PREVIEW, stdio: "inherit" });
vite.on("exit", (code) => {
  watcher.close();
  process.exit(shuttingDown ? 0 : (code ?? 1));
});
for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => {
    shuttingDown = true;
    vite.kill(signal);
  });
}
