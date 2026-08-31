import {
  MenuContainer,
  MenuItem,
  MenuDivider,
  MenuLabel,
  MenuTitle,
  MenuList,
  MenuListItem,
} from 'ui/components/menu-primitives';
import { Section } from '../../Section';

export function MenuPrimitivesSection() {
  return (
    <Section title="Menu primitives">
      <MenuContainer width="md">
        <MenuTitle>Settings</MenuTitle>
        <MenuLabel>Section</MenuLabel>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
        <MenuDivider />
        <MenuItem suffixSlot="⌘K">With shortcut</MenuItem>
        <MenuList>
          <MenuListItem label="Width" value={120} />
          <MenuListItem label="Height" value={80} />
          <MenuListItem label="Opacity" value="100%" />
        </MenuList>
      </MenuContainer>
    </Section>
  );
}
