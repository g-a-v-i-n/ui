import type { ComponentType } from 'react';
import type { Doc } from './types';

export type Group = 'foundations' | 'components';

export type Page = {
  name: string;
  slug: string;
  group: Group;
  path: string;
  /** Hero + controls + props, from docs/pages/<Name>.tsx. */
  doc?: Doc;
  /** Free-form examples, from sections/<Name>/index.tsx. */
  Examples?: ComponentType;
};

/* Section folders that document tokens rather than a component; everything
   else is a component page. The value is the sidebar label. */
const FOUNDATIONS: Record<string, string> = {
  FontScale: 'Font scale',
  ColorScaleExperiment: 'Color scale',
};

const docModules = import.meta.glob<{ doc: Doc }>('./pages/*.tsx', { eager: true });
const sectionModules = import.meta.glob<Record<string, ComponentType>>(
  '../sections/*/index.tsx',
  { eager: true }
);

/* AlertDialog → alert-dialog, OTPInput → otp-input: matches the component
   folder names under ui/src/components. */
const kebab = (name: string) =>
  name
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();

const spaced = (name: string) => name.replace(/([a-z])([A-Z])/g, '$1 $2');

const pagesByKey = new Map<string, Page>();

function ensurePage(key: string): Page {
  let page = pagesByKey.get(key);
  if (!page) {
    const group: Group = key in FOUNDATIONS ? 'foundations' : 'components';
    const slug = kebab(key);
    page = { name: FOUNDATIONS[key] ?? spaced(key), slug, group, path: `/${group}/${slug}` };
    pagesByKey.set(key, page);
  }
  return page;
}

for (const [file, mod] of Object.entries(sectionModules)) {
  const parts = file.split('/');
  const key = parts[parts.length - 2] ?? '';
  const Examples = mod[`${key}Section`];
  if (!Examples) {
    console.warn(`sections/${key}/index.tsx must export ${key}Section; skipping it`);
    continue;
  }
  ensurePage(key).Examples = Examples;
}

for (const [file, mod] of Object.entries(docModules)) {
  const parts = file.split('/');
  const key = (parts[parts.length - 1] ?? '').replace(/\.tsx$/, '');
  const page = ensurePage(key);
  page.doc = mod.doc;
  if (mod.doc.name) page.name = mod.doc.name;
}

const foundationOrder = Object.keys(FOUNDATIONS);

export const pages: Page[] = [...pagesByKey.values()].sort((a, b) => {
  if (a.group !== b.group) return a.group === 'foundations' ? -1 : 1;
  if (a.group === 'foundations') {
    return foundationOrder.indexOf(a.slug) - foundationOrder.indexOf(b.slug);
  }
  return a.name.localeCompare(b.name);
});

export const groups: { group: Group; label: string; pages: Page[] }[] = [
  { group: 'foundations', label: 'Foundations', pages: pages.filter((p) => p.group === 'foundations') },
  { group: 'components', label: 'Components', pages: pages.filter((p) => p.group === 'components') },
];
