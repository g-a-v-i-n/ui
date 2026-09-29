import { Button } from 'ui/components/button';
import { Spinner } from 'ui/components/spinner';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description:
    'An indeterminate loading indicator in the five icon sizes. It inherits the text color, so it fits inside buttons as well as on its own.',
  controls: {
    size: { type: 'segmented', options: ['xs', 'sm', 'md', 'lg', 'xl'], default: 'md' },
    label: { type: 'text', default: 'Loading' },
    color: { type: 'segmented', options: ['default', 'blue', 'tomato'], default: 'default' },
    inButton: { type: 'boolean', label: 'Inside a button', default: false },
  },
  render: ({ size, label, color, inButton }) => {
    const spinner = (
      <Spinner
        size={size}
        label={label}
        style={color === 'default' ? undefined : { color: `var(--${color}-9)` }}
      />
    );
    return inButton ? (
      <Button disabled prefixSlot={spinner}>
        Saving…
      </Button>
    ) : (
      spinner
    );
  },
});
