import { Icon } from 'ui/components/icon';
import { Toggle } from 'ui/components/toggle';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description: 'A button that stays pressed or unpressed, for on/off formatting-style options.',
  controls: {
    children: { type: 'text', label: 'Label', default: 'Bold' },
    pressed: { type: 'boolean', label: 'Initially pressed', default: false },
    width: { type: 'segmented', options: ['hug', 'square'], default: 'hug' },
    icon: { type: 'boolean', label: 'With icon', default: false },
    disabled: { type: 'boolean', default: false },
  },
  /* Uncontrolled so the example stays interactive; the key remounts it when
     the initial state control changes. Square toggles are icon-only, so the
     label becomes the accessible name. */
  render: ({ children, pressed, width, icon, disabled }) => (
    <Toggle
      key={String(pressed)}
      defaultPressed={pressed}
      width={width}
      disabled={disabled}
      aria-label={width === 'square' ? children : undefined}
    >
      {(icon || width === 'square') && <Icon icon="star" size="md" />}
      {width === 'square' ? null : children}
    </Toggle>
  ),
});
