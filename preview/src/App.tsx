import { useState, type ComponentType } from 'react';
import { Text } from 'ui/components/text';
import { Theme } from 'ui/components/theme';
import { TooltipProvider } from 'ui/components/tooltip';
import { ToastProvider, ToastViewport } from 'ui/components/toast';

import { TestDropdownMenuProvider } from './TestDropdownMenuProvider';

/* Deliberate, non-alphabetical presentation order. Every folder under
   ./sections should appear here and export `<Name>Section`; mismatches warn
   in dev below, and unlisted sections still render (last, alphabetically) so
   a new section can't silently vanish. */
const ORDER = [
  'Text',
  'FontScale',
  'ColorScaleExperiment',
  'Icon',
  'Button',
  'Checkbox',
  'Switch',
  'Radio',
  'ToggleGroup',
  'Tag',
  'MiddleDot',
  'PieChart',
  'TextInput',
  'TextArea',
  'PasswordInput',
  'OTPInput',
  'Callout',
  'Tooltip',
  'Dialog',
  'Drawer',
  'MenuPrimitives',
  'ContextMenu',
  'DropdownMenu',
  'Label',
  'Toggle',
  'Toolbar',
  'Tabs',
  'Accordion',
  'Collapsible',
  'Select',
  'Combobox',
  'Slider',
  'Spinner',
  'Progress',
  'Avatar',
  'Table',
  'Separator',
  'Card',
  'Carousel',
  'ScrollArea',
  'IconSwap',
  'GradientMask',
  'Popover',
  'HoverCard',
  'AlertDialog',
  'FullscreenModal',
  'Menubar',
  'NavigationMenu',
  'Toast',
  'Sidebar',
  'SplitPane',
  'AspectRatio',
  'Form',
];

const modules = import.meta.glob<Record<string, ComponentType>>(
  './sections/*/index.tsx',
  { eager: true }
);

const sectionsByName = new Map<string, ComponentType>();
for (const [path, mod] of Object.entries(modules)) {
  const name = path.split('/')[2];
  const component = mod[`${name}Section`];
  if (!component) {
    console.warn(`sections/${name}/index.tsx must export ${name}Section; skipping it`);
    continue;
  }
  sectionsByName.set(name, component);
}

/* Sections missing from ORDER still render, appended alphabetically. */
const unordered = [...sectionsByName.keys()].filter((name) => !ORDER.includes(name)).sort();

if (import.meta.env.DEV) {
  for (const name of ORDER) {
    if (!sectionsByName.has(name)) {
      console.warn(`ORDER lists "${name}" but sections/${name}/ doesn't exist`);
    }
  }
  for (const name of unordered) {
    console.warn(`sections/${name}/ is not listed in ORDER; rendering it last`);
  }
}

const sections = [...ORDER, ...unordered].flatMap((name) => {
  const Component = sectionsByName.get(name);
  return Component ? [{ name, Component }] : [];
});

function App() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  return (
    <Theme theme={theme} setResolvedTheme={setResolvedTheme}>
      <TooltipProvider delayDuration={200}>
        <ToastProvider swipeDirection="right">
          <TestDropdownMenuProvider>
            <main className="page">
              <header className="page-header">
                <Text as="h1" size="2xl" weight="semibold">
                  UI component preview
                </Text>
                <label className="theme-picker">
                  <Text as="span" size="sm">
                    Theme
                  </Text>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
                  >
                    <option value="light">light</option>
                    <option value="dark">dark</option>
                    <option value="system">system</option>
                  </select>
                  <Text as="span" size="sm" className="resolved">
                    (resolved: {resolvedTheme})
                  </Text>
                </label>
              </header>

              {sections.map(({ name, Component }) => (
                <Component key={name} />
              ))}
            </main>
          </TestDropdownMenuProvider>
          <ToastViewport />
        </ToastProvider>
      </TooltipProvider>
    </Theme>
  );
}

export default App;
