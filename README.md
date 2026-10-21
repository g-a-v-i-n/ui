# UI

An open-ended design system.

## Scripts

All run from the repo root with `pnpm <script>`.

### Build

- **`build`** — build the `ui` package: clean `ui/dist`, compile TS with `tsc`, then copy the CSS files alongside it.
- **`build:all`** — the deploy build: regenerate the color scales (`generate-color-scales`, `generate-custom-colors`), then build `ui` and the `preview` app. No network access and no Figma credentials — the icon components are generated separately with `generate-icons` and committed, so a Vercel build never talks to Figma.
- **`clean`** — remove build artifacts (`dist`, tsbuildinfo) in every package.

### Checks

- **`lint`** — oxlint over `ui/src`, including the in-house `anti-slop` rules from `tools/oxlint`.
- **`typecheck`** — `tsc --noEmit` in every package that defines it (`-r --no-bail`, so all packages report before failing), then `typecheck:scripts`.
- **`typecheck:scripts`** — typecheck `scripts/` and `tools/` under Node type-stripping constraints (`tsconfig.scripts.json`).

### Codegen

- **`generate-icons`** — export the icon frames from a Figma page and write them as React components (`CheckIcon`, `ChevronDownIcon`, …) to `ui/src/components/icon/static`, plus the two indexes: `icon/names.ts`, the named re-exports behind `ui/components/icon`, and `icon/registry/icons.ts`, the name→component map behind the string-keyed `Icon` in `ui/components/icon/registry`. Requires `FIGMA_TOKEN` and `FIGMA_FILE_KEY` (env or repo-root `.env`); the page is configurable via `FIGMA_PAGE` or `--page` (default `normal`).
- **`generate-icons:index`** — rebuild only the two indexes from the components already on disk; no Figma access needed.
- **`generate-docs-props`** — extract every component's props (type, default, description) from `ui/src/components/*/index.tsx` with the TypeScript compiler API and write `preview/src/generated/props.json` for the docs site's props tables. No network needed; the preview's `predev`/`prebuild` hooks run it.
- **`generate-color-scales`** — write the tier-1 color scales: every Radix scale the tokens use, as `light-dark()` pairs, to `ui/src/css/scales.css`, plus the `data-gray` remaps in `ui/src/css/gray-tone.css`. Reads `@radix-ui/colors`; no network. The output is committed and `color.css` imports it.
- **`generate-custom-colors`** — the in-house scale generator (`scripts/vendor/custom-color`): builds the 12-step solid + alpha scales (gray, tomato, blue, lime, amber) along the shared luminance ramp and writes `ui/src/css/custom/<name>.css`, each step a `light-dark()` pair built from the ramp and its reverse (step 1 dark → step 12 light), both anchored to the seed color at step 9. The output is not currently imported: `scales.css` carries the stock Radix values.

### Dev

- **`dev`** — the live loop for working on the library against the docs site: build `ui`, regenerate the props data, start the preview's Vite dev server, then watch `ui/src` and on every change rebuild `ui` in place (`tsc` for `.ts`/`.tsx`, the CSS copy for `.css`) and regenerate the props; Vite reloads the preview from the fresh `dist`. Extra arguments go to vite: `pnpm dev --port 5180`.
- **`agentation`** — start the Agentation MCP server, which relays visual annotations left in the preview app to the agent.
- **`pnpm --filter preview dev`** — run the docs site (the `preview` package): a page per component with a configurable hero, examples, and a generated props table. It consumes the built `ui/dist`, so `build` runs first via the preview's `predev` hook; edits to `ui/src` need a rebuild to show up (`dev` above automates that).

## Theming

Every visual token — colors, font scale, sizes, motion — is a custom property on `:root`, declared by `ui/css/base.css`. A consumer themes the library by loading its own stylesheet after `base.css` and redeclaring the tokens it wants to change on `:root`; later declarations win. `examples/theme.css` shows the pattern, retuning the small-screen font scaling and nudging one size.

### Color tokens

Colors come in two tiers. Tier 1 is the raw scales — `--gray-1…12`, `--blue-a1…12` and the rest — generated into `ui/src/css/scales.css` from `@radix-ui/colors`, every step a `light-dark(<light>, <dark>)` pair. Tier 2, in `ui/src/css/color.css`, is the set of roles components actually read: surfaces (`--bg-base`, `--bg-elevated`, `--bg-modal`, `--bg-primary…quaternary`), interaction washes (`--bg-hover`, `--bg-selected`, `--bg-pressed`, `--bg-disabled`, `--bg-tint`), text (`--fg-primary…quaternary`, `--fg-disabled`, `--fg-inverse`), borders (`--border-subtle`, `--border`, `--border-strong`, `--border-emphasis`), raised controls (`--bg-control*`), and the accent and status families (`--accent`, `--success`, `--warning`, `--danger`, each with `-strong`, `-text`, `-tint` and `-border` steps). Component stylesheets never reference a scale step directly, so re-theming is a matter of redeclaring roles: swap `--accent*` to recolor every checked control, link and indicator at once.

Elevation follows the same idea in `ui/src/css/shadow.css`: each hairline rim and drop shadow is published as a shape (`--hairline-shape`, `--shadow-sm-shape`, …) and a default color, assembled into the ready-made `--shadow-button`, `--shadow-card`, `--shadow-elevated`. A component that needs a tinted rim composes its own `box-shadow` from a shape and a color role (`var(--hairline-shape) var(--danger-border)`), so there is no per-element slot and every token resolves on `:root`.

### Light and dark

The mode is an attribute, read by `color-scheme`:

```html
<html>                    <!-- follows the OS preference; no JavaScript needed -->
<html data-theme="dark">  <!-- forced dark; data-theme="light" forces light -->
<div data-theme="dark">   <!-- a dark subtree inside a light page -->
```

Because every color token is a `light-dark()` pair, a nested `data-theme` recolors its subtree completely; only the handful of shadow *shapes* that differ in dark (thicker hairlines, tighter drops) follow the document theme. Portaled content (menus, dialogs) renders under `<body>` and follows the document too.

`ui/components/theme` exports `<Theme theme gray fontScale>`, which writes the attributes to `<html>` with transitions suppressed (it puts `.no-transitions` from `ui/src/css/motion.css` on the root around the change and removes it once a frame has rendered, so the whole page recolors at once); every prop is optional and `"system"` means no attribute. `<ThemeScope>` renders a themed `<div>` for a subtree, `useResolvedTheme()` reports the mode the document is actually in, and `themeInitScript()` returns the inline script an app that persists the choice drops in `<head>` to restore it before first paint. Apps that already manage `<html data-theme>` (next-themes and the like) need none of this — the CSS only reads the attribute.

### Font scale

The `--font-size-{xs…5xl}` tokens, with their `--line-height-*` and `--letter-spacing-*` companions, default to 11/13/15/18/20/24/32/48/64px. Every size and its tracking is multiplied by `--font-scaling`, which `ui/src/css/font.css` raises from 1 to 1.2 below 640px; redeclare it in your own media queries after `base.css` to change the factor or the breakpoint. The earlier ramp, one step smaller through the body sizes (12/14/16 for sm/md/lg), is available as `data-font-scale="compact"` on the root or any subtree, or as `<Theme fontScale="compact">`; `FONT_SCALES` lists the values. The preview app has a "Font scale" picker in the sidebar.

### Corners

Radii are a six-step scale, `--radius-{xs,sm,md,lg,xl,2xl}` at 4/8/10/12/14/16px, plus `--radius-full` for pills, declared in `ui/src/css/radius.css` beside `--corner-shape`, the superellipse every corner is drawn with. Each element reads the step for its role, so redeclaring one token retunes a whole class of elements: `--radius-md` is the control radius (TextInput, TextArea, Select trigger, OTP cells, segmented items), `--radius-sm` the chrome radius (toolbar, menubar and navigation triggers, toggles, menu and select items, sidebar items, checkbox, tag), `--radius-lg` the container radius (Card, Callout, Carousel, the ToggleGroup frame, CheckboxRow, floating surfaces), and `--radius-xs` the small pieces inside a control. Button is the exception: its radius is a fraction of its height, `--control-radius-ratio` (0.4, rounded to whole pixels), so every size keeps the same proportion and one token retunes all five. Setting every step and the ratio to `0` squares the library off.

### Gray tone

Every gray role resolves through the `--gray-1…12` / `--gray-a1…12` variables. By default those are the neutral Radix gray. To swap in one of Radix's tinted grays (`mauve`, `slate`, `sage`, `olive`, `sand`), set `data-gray` on the root — or on any subtree — and `ui/src/css/gray-tone.css` (generated with the scales) re-points `--gray-*` at that scale; each tinted step is itself a `light-dark()` pair, so one remap serves both modes:

```html
<html data-gray="slate">
```

The `Theme` component exposes the same switch as a prop (`<Theme gray="slate">`), defaulting to `"gray"`, which leaves the attribute off. `GRAY_TONES` lists the valid values. The preview app has a "Gray" picker next to the theme picker.
