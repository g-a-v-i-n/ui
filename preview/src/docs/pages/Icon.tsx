import { Icon } from 'ui/components/icon';
import { Text } from 'ui/components/text';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description:
    'A glyph from the icon set. Five named sizes; the color comes from the surrounding text.',
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
