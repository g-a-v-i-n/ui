# preview

A Vite + React app that renders every component in the sibling `ui` library,
one section per component, with a light/dark/system theme picker.

```sh
pnpm --filter preview dev     # run locally
pnpm --filter preview build   # type-check + bundle
```

The preview imports the built library (`ui/dist`), not its sources, so run
`pnpm build` from the repo root first — the `predev` hook does this for
`pnpm --filter preview dev`. Edits under `ui/` need a rebuild to show up.

Sections live in `src/sections/<Name>/index.tsx`, must export `<Name>Section`,
and are auto-registered via `import.meta.glob` — add the folder, then add the
name to the `ORDER` array in `src/App.tsx` to choose where it renders.
