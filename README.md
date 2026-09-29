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
- **`generate-docs-props`** — extract every component's props (type, default, description) from `ui/src/components/*/index.tsx` with the TypeScript compiler API and write `preview/src/generated/props.json` for the docs site's props tables. No network needed; the preview's `predev`/`prebuild` hooks run it.
- **`generate-custom-colors`** — the in-house scale generator (`scripts/vendor/custom-color`): builds the 12-step solid + alpha scales (gray, tomato, blue, lime, amber) along the shared luminance ramp and writes `ui/src/css/custom/<name>.css`. Each file gets a light block and a `.dark` block built from the reversed ramp (step 1 dark → step 12 light), both anchored to the seed color at step 9. The output is not currently imported: `ui/src/css/color.css` uses the stock Radix scales and keeps the `./custom/*.css` imports commented out.

### Dev

- **`dev`** — the live loop for working on the library against the docs site: build `ui`, regenerate the props data, start the preview's Vite dev server, then watch `ui/src` and on every change rebuild `ui` in place (`tsc` for `.ts`/`.tsx`, the CSS copy for `.css`) and regenerate the props; Vite reloads the preview from the fresh `dist`. Extra arguments go to vite: `pnpm dev --port 5180`.
- **`agentation`** — start the Agentation MCP server, which relays visual annotations left in the preview app to the agent.
- **`pnpm --filter preview dev`** — run the docs site (the `preview` package): a page per component with a configurable hero, examples, and a generated props table. It consumes the built `ui/dist`, so `build` runs first via the preview's `predev` hook; edits to `ui/src` need a rebuild to show up (`dev` above automates that).

## Theming

Every visual token — colors, font scale, sizes, motion — is a custom property on `:root`, declared by `ui/css/base.css`. A consumer themes the library by loading its own stylesheet after `base.css` and redeclaring the tokens it wants to change on `:root`; later declarations win. `examples/theme.css` shows the pattern, retuning the small-screen font scaling and nudging one size.

### Font scale

The `--font-size-{xs…5xl}` tokens, with their `--line-height-*` and `--letter-spacing-*` companions, default to 11/13/15/18/20/24/32/48/64px. Every size and its tracking is multiplied by `--font-scaling`, which `ui/src/css/font.css` raises from 1 to 1.2 below 640px; redeclare it in your own media queries after `base.css` to change the factor or the breakpoint. The earlier ramp, one step smaller through the body sizes (12/14/16 for sm/md/lg), is available as `data-font-scale="compact"` on the root or any subtree, or as `<Theme fontScale="compact">`; `FONT_SCALES` lists the values. The preview app has a "Font scale" picker in the sidebar.

### Corners

Radii are a six-step scale, `--radius-{xs,sm,md,lg,xl,2xl}` at 4/8/10/12/14/16px, plus `--radius-full` for pills, declared in `ui/src/css/radius.css` beside `--corner-shape`, the superellipse every corner is drawn with. Each element reads the step for its role, so redeclaring one token retunes a whole class of elements: `--radius-md` is the control radius (Button, TextInput, TextArea, Select trigger, OTP cells, segmented items), `--radius-sm` the chrome radius (toolbar, menubar and navigation triggers, toggles, menu and select items, sidebar items, checkbox, tag), `--radius-lg` the container radius (Card, Callout, Carousel, the ToggleGroup frame, CheckboxRow, floating surfaces), and `--radius-xs` the small pieces inside a control. The two largest Button sizes use `--radius-xl` and `--radius-2xl`. Setting every step to `0` squares the library off.

### Gray tone

Every component reads the `--gray-1…12` / `--gray-a1…12` variables. By default those are the neutral Radix gray. To swap in one of Radix's tinted grays (`mauve`, `slate`, `sage`, `olive`, `sand`), set `data-gray` on the root — or on any subtree — and `ui/src/css/gray-tone.css` re-points `--gray-*` at that scale for both light and dark:

```html
<html data-gray="slate">
```

The `Theme` component exposes the same switch as a prop (`<Theme gray="slate">`), defaulting to `"gray"`, which leaves the attribute off. `GRAY_TONES` lists the valid values. The preview app has a "Gray" picker next to the theme picker.

`Theme` applies the light/dark class, `data-gray`, and `data-font-scale` with transitions suppressed: it puts `.no-transitions` (from `ui/src/css/motion.css`, `transition: none !important` on everything) on `<html>` around the change and removes it once a frame has rendered, so the whole page recolors at once instead of each component cross-fading at its own duration. Animations are left alone.
