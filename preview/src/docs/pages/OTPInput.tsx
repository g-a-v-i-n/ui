import { OTPInput } from 'ui/components/otp-input';
import { defineDoc } from '../types';

export const doc = defineDoc({
  name: 'OTP Input',
  description:
    'One slot per character for verification codes. Typing, pasting, and arrow keys move through the slots.',
  controls: {
    length: { type: 'number', default: 6, min: 3, max: 8, step: 1 },
    validationType: {
      type: 'select',
      label: 'Validation',
      options: ['numeric', 'alpha', 'alphanumeric', 'none'],
      default: 'numeric',
    },
    type: { type: 'segmented', options: ['text', 'password'], default: 'text' },
    prefilled: { type: 'boolean', label: 'Start with a value', default: false },
    disabled: { type: 'boolean', default: false },
  },
  /* Uncontrolled so the example stays interactive; the key remounts it when
     the slot count, validation, or initial value changes. */
  render: ({ length, validationType, type, prefilled, disabled }) => (
    <OTPInput
      key={`${length}-${validationType}-${prefilled}`}
      length={length}
      defaultValue={prefilled ? (validationType === 'alpha' ? 'ABCD' : '1234') : undefined}
      validationType={validationType}
      type={type}
      disabled={disabled}
      aria-label="Verification code"
    />
  ),
});
