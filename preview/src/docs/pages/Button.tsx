import { Button } from 'ui/components/button';
import { Icon } from 'ui/components/icon';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description:
    'Triggers an action. Three variants, five control heights, optional icon slots, and hug, fill, or square widths.',
  controls: {
    children: { type: 'text', label: 'Label', default: 'Button' },
    variant: { type: 'select', options: ['primary', 'secondary', 'destructive'], default: 'primary' },
    size: { type: 'segmented', options: ['xs', 'sm', 'md', 'lg', 'xl'], default: 'md' },
    width: { type: 'segmented', options: ['hug', 'fill', 'square'], default: 'hug' },
    round: { type: 'boolean', default: false },
    prefixIcon: { type: 'boolean', label: 'Prefix icon', default: false },
    suffixIcon: { type: 'boolean', label: 'Suffix icon', default: false },
    disabled: { type: 'boolean', default: false },
  },
  render: ({ children, variant, size, width, round, prefixIcon, suffixIcon, disabled }) => (
    <Button
      variant={variant}
      size={size}
      width={width}
      round={round}
      disabled={disabled}
      aria-label={width === 'square' ? children : undefined}
      prefixSlot={prefixIcon ? <Icon icon="check" size="lg" /> : undefined}
      suffixSlot={suffixIcon ? <Icon icon="chevron-right" size="lg" /> : undefined}
    >
      {width === 'square' ? <Icon icon="check" size="md" /> : children}
    </Button>
  ),
});
