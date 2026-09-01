# preview

A Vite + React app that renders every component in the sibling `ui` library,
one section per component, with a light/dark/system theme picker.

```sh
pnpm --filter preview dev     # run locally
pnpm --filter preview build   # type-check + bundle
```

Sections live in `src/sections/<Name>/index.tsx`, must export `<Name>Section`,
and are auto-registered via `import.meta.glob` — add the folder, then add the
name to the `ORDER` array in `src/App.tsx` to choose where it renders.
