import { Tag } from 'ui/components/tag';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description: 'A small label for status, counts, and keyboard shortcuts.',
  controls: {
    children: { type: 'text', label: 'Label', default: 'Paid' },
    variant: { type: 'select', options: ['default', 'success', 'warning', 'error', 'blue'], default: 'default' },
    secondary: { type: 'boolean', default: false },
    outline: { type: 'boolean', default: false },
    round: { type: 'boolean', default: false },
    mono: { type: 'boolean', default: false },
  },
  render: ({ children, variant, secondary, outline, round, mono }) => (
    <Tag variant={variant} secondary={secondary} outline={outline} round={round} mono={mono}>
      {children}
    </Tag>
  ),
});
