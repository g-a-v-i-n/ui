import { Icon } from 'ui/components/icon/registry';
import { Text } from 'ui/components/text';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description:
    'A glyph from the icon set. Five named sizes; the color comes from the surrounding text. Import a glyph by name (`CheckIcon` from ui/components/icon) so only the icons you render ship; the string-keyed `Icon` below lives in ui/components/icon/registry and bundles the whole set.',
  modules: ['icon/registry', 'icon'],
  propsFor: ['Icon', 'IconWrapper'],
  controls: {
    icon: {
      type: 'select',
      options: [
        'check',
        'x-mark',
        'plus',
        'chevron-right',
        'arrow-right',
        'magnifying-glass',
        'star',
        'gear',
        'folder',
        'document',
        'link',
        'sun',
      ],
      default: 'check',
    },
    size: { type: 'segmented', options: ['xs', 'sm', 'md', 'lg', 'xl'], default: 'md' },
    color: { type: 'segmented', options: ['primary', 'secondary', 'tertiary'], default: 'primary' },
  },
  /* Icons paint in currentColor, so the color control sets it on a wrapping Text. */
  render: ({ icon, size, color }) => (
    <Text as="span" color={color} style={{ display: 'inline-flex' }}>
      <Icon icon={icon} size={size} />
    </Text>
  ),
});
