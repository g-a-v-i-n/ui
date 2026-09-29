import { Icon, type IconName } from 'ui/components/icon';
import {
  MenuContainer,
  MenuItem,
  MenuDivider,
  MenuGroup,
  MenuLabel,
  MenuTitle,
  MenuList,
  MenuListItem,
} from 'ui/components/menu-primitives';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description:
    'The shared building blocks behind every menu: the floating container, items with prefix and suffix slots, labels, dividers, and a key/value list.',
  controls: {
    width: { type: 'segmented', options: ['sm', 'md', 'lg', 'auto'], default: 'md' },
    title: { type: 'boolean', default: true },
    label: { type: 'boolean', label: 'Section label', default: true },
    icons: { type: 'boolean', label: 'With icons', default: false },
    shortcuts: { type: 'boolean', label: 'With shortcuts', default: true },
    list: { type: 'boolean', label: 'Key/value list', default: true },
  },
  render: ({ width, title, label, icons, shortcuts, list }) => {
    const icon = (name: IconName) => (icons ? <Icon icon={name} size="lg" /> : undefined);
    const shortcut = (keys: string) => (shortcuts ? keys : undefined);
    return (
      <MenuContainer width={width}>
        {title && <MenuTitle>Layer</MenuTitle>}
        <MenuGroup>
          {label && <MenuLabel>Arrange</MenuLabel>}
          <MenuItem prefixSlot={icon('arrow-up')} suffixSlot={shortcut('⌘]')}>
            Bring forward
          </MenuItem>
          <MenuItem prefixSlot={icon('arrow-down')} suffixSlot={shortcut('⌘[')}>
            Send backward
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuItem prefixSlot={icon('link')} suffixSlot={shortcut('⌘K')}>
          Copy link
        </MenuItem>
        {list && (
          <>
            <MenuDivider />
            <MenuList>
              <MenuListItem label="Width" value={120} />
              <MenuListItem label="Height" value={80} />
              <MenuListItem label="Opacity" value="100%" />
            </MenuList>
          </>
        )}
      </MenuContainer>
    );
  },
});
