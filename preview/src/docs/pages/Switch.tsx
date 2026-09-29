import { Switch } from 'ui/components/switch';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description: 'A two-state toggle for settings that take effect immediately.',
  controls: {
    checked: { type: 'boolean', label: 'Initially checked', default: true },
    disabled: { type: 'boolean', default: false },
  },
  /* Uncontrolled so the example stays interactive; the key remounts it when
     the initial state control changes. */
  render: ({ checked, disabled }) => (
    <Switch key={String(checked)} defaultChecked={checked} disabled={disabled} aria-label="Example" />
  ),
});
