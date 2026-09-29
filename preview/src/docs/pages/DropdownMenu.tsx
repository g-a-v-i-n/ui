import { useState } from 'react';
import { Button } from 'ui/components/button';
import { Icon, type IconName } from 'ui/components/icon';
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuArrow,
} from 'ui/components/dropdown-menu';
import { defineDoc, type Controls, type ControlValues } from '../types';

const controls = {
  width: { type: 'segmented', options: ['sm', 'md', 'lg', 'auto'], default: 'md' },
  side: { type: 'select', options: ['top', 'right', 'bottom', 'left'], default: 'bottom' },
  align: { type: 'segmented', options: ['start', 'center', 'end'], default: 'start' },
  icons: { type: 'boolean', label: 'With icons', default: false },
  shortcuts: { type: 'boolean', label: 'With shortcuts', default: true },
  submenu: { type: 'boolean', label: 'With sub-menu', default: true },
  checkboxes: { type: 'boolean', label: 'With checkbox items', default: false },
  arrow: { type: 'boolean', default: false },
} as const satisfies Controls;

/* The example owns its own DropdownMenuRoot even though the app mounts a
   page-level one (TestDropdownMenuProvider): Radix binds a trigger to the
   nearest root, so nesting works and the controls shape this menu rather
   than the shared test menu. Checkbox items are controlled-only in Radix,
   so their state lives here too. */
function Example({
  width,
  side,
  align,
  icons,
  shortcuts,
  submenu,
  checkboxes,
  arrow,
}: ControlValues<typeof controls>) {
  const [showToolbar, setShowToolbar] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const icon = (name: IconName) => (icons ? <Icon icon={name} size="lg" /> : undefined);
  const shortcut = (keys: string) => (shortcuts ? keys : undefined);

  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <Button variant="secondary" suffixSlot={<Icon icon="chevron-down-mini-bold" size="lg" />}>
          Open menu
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent width={width} side={side} align={align}>
        <DropdownMenuLabel>Document</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem prefixSlot={icon('document')} suffixSlot={shortcut('⌘N')}>
            New file
          </DropdownMenuItem>
          <DropdownMenuItem prefixSlot={icon('folder')} suffixSlot={shortcut('⌘O')}>
            Open…
          </DropdownMenuItem>
          <DropdownMenuItem prefixSlot={icon('link')} suffixSlot={shortcut('⇧⌘C')}>
            Copy link
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {submenu && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger prefixSlot={icon('photo')}>Export as</DropdownMenuSubTrigger>
              <DropdownMenuSubContent width="sm">
                <DropdownMenuItem>PNG</DropdownMenuItem>
                <DropdownMenuItem>SVG</DropdownMenuItem>
                <DropdownMenuItem suffixSlot={shortcut('⌘E')}>PDF</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </>
        )}
        {checkboxes && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>View</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuCheckboxItem
                checked={showToolbar}
                onCheckedChange={(v) => setShowToolbar(Boolean(v))}
              >
                Show toolbar
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showSidebar}
                onCheckedChange={(v) => setShowSidebar(Boolean(v))}
              >
                Show sidebar
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem prefixSlot={icon('gear')} suffixSlot={shortcut('⌘,')}>
          Settings…
        </DropdownMenuItem>
        {arrow && <DropdownMenuArrow />}
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
}

export const doc = defineDoc({
  description:
    'A menu of actions opened from a button, with groups, labels, checkable items, and sub-menus.',
  propsFor: [
    'DropdownMenuRoot',
    'DropdownMenuTrigger',
    'DropdownMenuContent',
    'DropdownMenuItem',
    'DropdownMenuCheckboxItem',
    'DropdownMenuRadioItem',
    'DropdownMenuSubContent',
  ],
  controls,
  render: (values) => <Example {...values} />,
});
