# UI

An open-ended design system.

## Scripts

All run from the repo root with `pnpm <script>`.

### Build

- **`build`** — build the `ui` package: compile TS to `ui/dist` (`tsc` + `tsc-alias`), then copy the CSS files alongside it.
- **`build:all`** — full pipeline: regenerate icons from Figma (`generate-icons`) and the custom color scales (`generate-custom-colors`), then build `ui` and the `preview` app. Needs the Figma env vars below.
- **`clean`** — remove build artifacts (`dist`, tsbuildinfo) in every package.

### Checks

- **`lint`** — oxlint over `ui/src`.
- **`typecheck`** — `tsc --noEmit` in every package that defines it (`-r --no-bail`, so all packages report before failing).
- **`format`** — run each package's format script.

### Codegen

- **`generate-icons`** — export the icon frames from Figma pages and write them as weighted React components to `ui/src/components/icon/static`, plus the icon index. Requires `FIGMA_TOKEN` and `FIGMA_FILE_KEY` (env or repo-root `.env`); pages configurable via `FIGMA_PAGES` (default `normal=normal,bold=bold`).
- **`generate-icons:index`** — rebuild only the icon index from the components already on disk; no Figma access needed.
- **`generate-custom-colors`** — the in-house scale generator (`scripts/vendor/custom-color`): builds the 12-step solid + alpha scales (gray, tomato, blue, lime, amber) along the shared luminance ramp and writes `ui/src/css/custom/<name>.css`. Each file gets a light block and a `.dark` block built from the reversed ramp (step 1 dark → step 12 light), both anchored to the seed color at step 9.
- **`generate-colors`** — the official Radix custom-palette generator driven by `colors.config.ts`; writes `ui/src/css/color-custom.css` in the same format as radix-ui.com/colors/custom (sRGB + wide-gamut `@supports` block). Currently unused — the import in `ui/src/css/color.css` is commented out in favor of the custom generator above.

### Dev

- **`website`** — start the website package's dev server.
- **`agentation`** — start the Agentation MCP server, which relays visual annotations left in the preview app to the agent.