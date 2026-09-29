import { Checkbox } from 'ui/components/checkbox';
import { Label } from 'ui/components/label';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description: 'A single on/off choice. Pair it with a Label, or use CheckboxRow for a full-width option.',
  controls: {
    label: { type: 'text', default: 'Accept the terms' },
    checked: { type: 'boolean', label: 'Initially checked', default: false },
    disabled: { type: 'boolean', default: false },
  },
  /* Uncontrolled so the example stays interactive; the key remounts it when
     the initial state control changes. */
  render: ({ label, checked, disabled }) => (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <Checkbox
        key={String(checked)}
        id="checkbox-doc"
        defaultChecked={checked}
        disabled={disabled}
        aria-label={label ? undefined : 'Example'}
      />
      {label && <Label htmlFor="checkbox-doc">{label}</Label>}
    </div>
  ),
});
