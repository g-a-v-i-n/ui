import { Icon } from 'ui/components/icon';
import { PasswordInput } from 'ui/components/password-input';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description:
    'A text field that masks its value with asterisks and adds a show/hide toggle. Takes every TextInput prop.',
  controls: {
    placeholder: { type: 'text', default: 'Enter password…' },
    prefilled: { type: 'boolean', label: 'Start with a value', default: false },
    width: { type: 'segmented', options: ['hug', 'fill'], default: 'fill' },
    prefixIcon: { type: 'boolean', label: 'Prefix icon', default: false },
    disabled: { type: 'boolean', default: false },
  },
  /* Uncontrolled so the example stays interactive; the key remounts it when
     the initial value control changes. */
  render: ({ placeholder, prefilled, width, prefixIcon, disabled }) => (
    <div style={{ width: 280, display: 'flex', justifyContent: 'center' }}>
      <PasswordInput
        key={String(prefilled)}
        defaultValue={prefilled ? 'hunter2' : undefined}
        placeholder={placeholder}
        width={width}
        disabled={disabled}
        aria-label="Password"
        prefixSlot={prefixIcon ? <Icon icon="lock-locked" size="md" /> : undefined}
      />
    </div>
  ),
});
