import { useState } from 'react';
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
import { Section } from '../../Section';

export function MenubarSection() {
  const [menubarChecks, setMenubarChecks] = useState(true);

  return (
    <Section title="Menubar">
      <MenubarRoot>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent width="sm">
            <MenubarItem suffixSlot={<span>⌘N</span>}>New file</MenubarItem>
            <MenubarItem suffixSlot={<span>⌘O</span>}>Open…</MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Export</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>PNG</MenubarItem>
                <MenubarItem>SVG</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent width="sm">
            <MenubarItem suffixSlot={<span>⌘Z</span>}>Undo</MenubarItem>
            <MenubarItem suffixSlot={<span>⇧⌘Z</span>}>Redo</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent width="sm">
            <MenubarCheckboxItem
              checked={menubarChecks}
              onCheckedChange={(v) => setMenubarChecks(Boolean(v))}
            >
              Show grid
            </MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
      </MenubarRoot>
    </Section>
  );
}
