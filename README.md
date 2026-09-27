# UI

An open-ended design system.

## Scripts

All run from the repo root with `pnpm <script>`.

### Build

- **`build`** — build the `ui` package: clean `ui/dist`, compile TS with `tsc`, then copy the CSS files alongside it.
- **`build:all`** — full pipeline: regenerate icons from Figma (`generate-icons`) and the custom color scales (`generate-custom-colors`), then build `ui` and the `preview` app. Needs the Figma env vars below.
- **`clean`** — remove build artifacts (`dist`, tsbuildinfo) in every package.

### Checks

- **`lint`** — oxlint over `ui/src`, including the in-house `anti-slop` rules from `tools/oxlint`.
- **`typecheck`** — `tsc --noEmit` in every package that defines it (`-r --no-bail`, so all packages report before failing), then `typecheck:scripts`.
- **`typecheck:scripts`** — typecheck `scripts/` and `tools/` under Node type-stripping constraints (`tsconfig.scripts.json`).

### Codegen

- **`generate-icons`** — export the icon frames from a Figma page and write them as React components to `ui/src/components/icon/static`, plus the icon index. Requires `FIGMA_TOKEN` and `FIGMA_FILE_KEY` (env or repo-root `.env`); the page is configurable via `FIGMA_PAGE` or `--page` (default `normal`).
- **`generate-icons:index`** — rebuild only the icon index from the components already on disk; no Figma access needed.
- **`generate-custom-colors`** — the in-house scale generator (`scripts/vendor/custom-color`): builds the 12-step solid + alpha scales (gray, tomato, blue, lime, amber) along the shared luminance ramp and writes `ui/src/css/custom/<name>.css`. Each file gets a light block and a `.dark` block built from the reversed ramp (step 1 dark → step 12 light), both anchored to the seed color at step 9. The output is not currently imported: `ui/src/css/color.css` uses the stock Radix scales and keeps the `./custom/*.css` imports commented out.

### Dev

- **`agentation`** — start the Agentation MCP server, which relays visual annotations left in the preview app to the agent.
- **`pnpm --filter preview dev`** — run the preview app. It consumes the built `ui/dist`, so `build` runs first via the preview's `predev` hook; edits to `ui/src` need a rebuild to show up.

## Gray tone

Every component reads the `--gray-1…12` / `--gray-a1…12` variables. By default those are the neutral Radix gray. To swap in one of Radix's tinted grays (`mauve`, `slate`, `sage`, `olive`, `sand`), set `data-gray` on the root — or on any subtree — and `ui/src/css/gray-tone.css` re-points `--gray-*` at that scale for both light and dark:

```html
<html data-gray="slate">
```

The `Theme` component exposes the same switch as a prop (`<Theme gray="slate">`), defaulting to `"gray"`, which leaves the attribute off. `GRAY_TONES` lists the valid values. The preview app has a "Gray" picker next to the theme picker.

`Theme` applies both the light/dark class and `data-gray` with transitions suppressed: it puts `.no-transitions` (from `ui/src/css/motion.css`, `transition: none !important` on everything) on `<html>` around the change and removes it once a frame has rendered, so the whole page recolors at once instead of each component cross-fading at its own duration. Animations are left alone.
