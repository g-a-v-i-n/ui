import { useState } from 'react';
import { Icon, type IconName } from 'ui/components/icon';
import {
  MenubarRoot,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarSeparator,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from 'ui/components/menubar';
import { defineDoc, type Controls, type ControlValues } from '../types';

const controls = {
  width: { type: 'segmented', options: ['sm', 'md', 'lg', 'auto'], default: 'sm' },
  icons: { type: 'boolean', label: 'With icons', default: false },
  shortcuts: { type: 'boolean', label: 'With shortcuts', default: true },
  submenu: { type: 'boolean', label: 'With sub-menu', default: true },
  disableEdit: { type: 'boolean', label: 'Disable "Edit"', default: false },
} as const satisfies Controls;

/* Checkbox items are controlled-only in Radix, so the example keeps the
   "Show grid" state itself. */
function Example({ width, icons, shortcuts, submenu, disableEdit }: ControlValues<typeof controls>) {
  const [showGrid, setShowGrid] = useState(true);
  const icon = (name: IconName) => (icons ? <Icon icon={name} size="lg" /> : undefined);
  const shortcut = (keys: string) => (shortcuts ? keys : undefined);

  return (
    <MenubarRoot>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent width={width}>
          <MenubarItem prefixSlot={icon('document')} suffixSlot={shortcut('⌘N')}>
            New file
          </MenubarItem>
          <MenubarItem prefixSlot={icon('folder')} suffixSlot={shortcut('⌘O')}>
            Open…
          </MenubarItem>
          {submenu && (
            <>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger prefixSlot={icon('photo')}>Export</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>PNG</MenubarItem>
                  <MenubarItem>SVG</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            </>
          )}
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger disabled={disableEdit}>Edit</MenubarTrigger>
        <MenubarContent width={width}>
          <MenubarItem prefixSlot={icon('arrow-left')} suffixSlot={shortcut('⌘Z')}>
            Undo
          </MenubarItem>
          <MenubarItem prefixSlot={icon('arrow-right')} suffixSlot={shortcut('⇧⌘Z')}>
            Redo
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent width={width}>
          <MenubarCheckboxItem
            checked={showGrid}
            onCheckedChange={(v) => setShowGrid(Boolean(v))}
            suffixSlot={shortcut('⌘G')}
          >
            Show grid
          </MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
    </MenubarRoot>
  );
}

export const doc = defineDoc({
  description:
    'A horizontal row of application menus; hovering across triggers switches between open menus.',
  propsFor: [
    'MenubarRoot',
    'MenubarMenu',
    'MenubarTrigger',
    'MenubarContent',
    'MenubarItem',
    'MenubarCheckboxItem',
    'MenubarSubContent',
  ],
  controls,
  render: (values) => <Example {...values} />,
});
