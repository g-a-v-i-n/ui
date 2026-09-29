import { ColorInput } from 'ui/components/color-input';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description:
    'A hex color field with a swatch and a picker popover. Typing a valid hex or dragging in the picker commits the color.',
  controls: {
    defaultValue: { type: 'text', label: 'Initial color', default: '#0090ff' },
    width: { type: 'segmented', options: ['hug', 'fill'], default: 'hug' },
    variant: { type: 'segmented', options: ['default', 'toolbar'], default: 'default' },
    disabled: { type: 'boolean', default: false },
  },
  /* Uncontrolled so the example stays interactive; the key remounts it when
     the initial color control changes. */
  render: ({ defaultValue, width, variant, disabled }) => (
    <div style={{ width: 240, display: 'flex', justifyContent: 'center' }}>
      <ColorInput
        key={defaultValue}
        defaultValue={defaultValue}
        width={width}
        variant={variant}
        disabled={disabled}
        aria-label="Color"
      />
    </div>
  ),
});
