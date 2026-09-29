# preview

The docs site for the sibling `ui` library: a Vite + React app with a page per
component, listed in a left-hand sidebar. Each page has a hero that renders the
component centered on a gray stage, a panel of controls (built from the
library's own Select, ToggleGroup, Switch, TextInput, and Slider) that drive the
example's props, free-form examples, and a props table generated from the
component's TypeScript types. The sidebar footer switches the light/dark theme
and the gray tone.

```sh
pnpm --filter preview dev     # run locally
pnpm --filter preview build   # type-check + bundle
```

The preview imports the built library (`ui/dist`), not its sources, so run
`pnpm build` from the repo root first — the `predev` hook does this for
`pnpm --filter preview dev`, and also regenerates the props data. Edits under
`ui/` need a rebuild to show up; `pnpm dev` from the root watches for them and
rebuilds automatically.

## Adding a component page

A page is assembled from two files that share a name:

- `src/docs/pages/<Name>.tsx` — exports `doc = defineDoc({...})` with a
  `description`, a `controls` schema (`select`, `segmented`, `boolean`, `text`,
  `number`), and `render(values)`, which returns the hero example for the
  current control values. Optional: `name` to override the display name,
  `modules` when the props tables come from more than one
  `ui/src/components/<dir>` folder (default: the kebab-case of the file name),
  and `propsFor` to limit or order the exported components documented.
- `src/sections/<Name>/index.tsx` — exports `<Name>Section`, the free-form
  examples rendered below the hero. Wrap them in `Section` from `src/Section`.

Either file alone still produces a page. `src/docs/registry.ts` discovers both
via `import.meta.glob`, derives the route (`/components/<slug>`), and sorts
components alphabetically; the folders named in its `FOUNDATIONS` map (font
scale, color scale) are listed first under Foundations instead.

## Props tables

`pnpm generate-docs-props` (from the repo root, also run by `predev` and
`prebuild`) walks every `ui/src/components/*/index.tsx` with the TypeScript
compiler API and writes `src/generated/props.json`: for each exported
component, its props with type, required flag, default (from destructuring
defaults or a `@default` JSDoc tag), and JSDoc description. Props inherited
from React's DOM attribute types are collapsed into a "also accepts native
attributes" note; Radix and library props are kept.
