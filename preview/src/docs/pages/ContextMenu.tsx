import { useState } from 'react';
import {
  ContextMenuRoot,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from 'ui/components/context-menu';
import { Text } from 'ui/components/text';
import { defineDoc } from '../types';

type ExampleProps = {
  shortcuts: boolean;
  submenu: boolean;
  selection: boolean;
  disabledItem: boolean;
};

/* Checkbox and radio items are controlled in Radix, so the example holds
   their state. */
function Example({ shortcuts, submenu, selection, disabledItem }: ExampleProps) {
  const [showGrid, setShowGrid] = useState(true);
  const [zoom, setZoom] = useState('fit');
  return (
    <ContextMenuRoot>
      <ContextMenuTrigger>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 280,
            height: 160,
            border: '1px dashed var(--fg-quaternary)',
            borderRadius: 12,
          }}
        >
          <Text as="div" size="sm" color="secondary">
            Right-click here
          </Text>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem suffixSlot={shortcuts ? '⌘X' : undefined}>Cut</ContextMenuItem>
        <ContextMenuItem suffixSlot={shortcuts ? '⌘C' : undefined}>Copy</ContextMenuItem>
        <ContextMenuItem suffixSlot={shortcuts ? '⌘V' : undefined} disabled={disabledItem}>
          Paste
        </ContextMenuItem>
        {submenu && (
          <>
            <ContextMenuSeparator />
            <ContextMenuSub>
              <ContextMenuSubTrigger>More</ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ContextMenuItem>Duplicate</ContextMenuItem>
                <ContextMenuItem>Rename</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
          </>
        )}
        {selection && (
          <>
            <ContextMenuSeparator />
            <ContextMenuLabel>View</ContextMenuLabel>
            <ContextMenuCheckboxItem
              checked={showGrid}
              onCheckedChange={(checked) => setShowGrid(Boolean(checked))}
            >
              Show grid
            </ContextMenuCheckboxItem>
            <ContextMenuRadioGroup value={zoom} onValueChange={setZoom}>
              <ContextMenuRadioItem value="fit">Zoom to fit</ContextMenuRadioItem>
              <ContextMenuRadioItem value="actual">Actual size</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </>
        )}
        <ContextMenuSeparator />
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenuRoot>
  );
}

export const doc = defineDoc({
  description:
    'A menu opened by right-click or long-press on a region, positioned at the pointer. Shares its parts with Dropdown Menu.',
  controls: {
    shortcuts: { type: 'boolean', label: 'Keyboard shortcuts', default: true },
    submenu: { type: 'boolean', label: 'With submenu', default: true },
    selection: { type: 'boolean', label: 'Checkbox and radio items', default: false },
    disabledItem: { type: 'boolean', label: 'Disable “Paste”', default: false },
  },
  render: ({ shortcuts, submenu, selection, disabledItem }) => (
    <Example
      shortcuts={shortcuts}
      submenu={submenu}
      selection={selection}
      disabledItem={disabledItem}
    />
  ),
});
