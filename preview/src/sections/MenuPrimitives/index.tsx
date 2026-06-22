import { Icon } from 'ui/components/icon';
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
        <MenuItem prefixSlot={<Icon icon="check" size="md" />}>Selected item</MenuItem>
        <MenuItem suffixSlot={<span>⌘K</span>}>With shortcut</MenuItem>
        <MenuDivider />
        <MenuList>
          <MenuListItem label="Width" value={120} />
          <MenuListItem label="Height" value={80} />
          <MenuListItem label="Opacity" value="100%" />
        </MenuList>
      </MenuContainer>
    </Section>
  );
}
