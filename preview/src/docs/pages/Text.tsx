import { Text } from 'ui/components/text';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description:
    'The typography primitive. Every size, weight, and color in the library goes through it.',
  controls: {
    children: { type: 'text', label: 'Text', default: 'The quick brown fox jumps over the lazy dog' },
    size: {
      type: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'],
      default: 'md',
    },
    weight: { type: 'segmented', options: ['regular', 'medium', 'semibold', 'bold'], default: 'regular' },
    color: { type: 'segmented', options: ['primary', 'secondary', 'tertiary'], default: 'primary' },
    transform: { type: 'select', options: ['none', 'uppercase', 'lowercase', 'capitalize'], default: 'none' },
    mono: { type: 'boolean', default: false },
    tabularNumbers: { type: 'boolean', label: 'Tabular numbers', default: false },
  },
  render: ({ children, size, weight, color, transform, mono, tabularNumbers }) => (
    <Text
      size={size}
      weight={weight}
      color={color}
      transform={transform}
      mono={mono}
      tabularNumbers={tabularNumbers}
      style={{ textAlign: 'center' }}
    >
      {children}
    </Text>
  ),
});
