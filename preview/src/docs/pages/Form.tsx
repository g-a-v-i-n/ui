import { Button } from 'ui/components/button';
import {
  FormRoot,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormSubmit,
} from 'ui/components/form';
import { TextInput } from 'ui/components/text-input';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description:
    'Fields, labels, and validation messages over the native constraint API. Messages appear on submit, by match, or from the server.',
  controls: {
    required: { type: 'boolean', default: true },
    serverInvalid: { type: 'boolean', label: 'Server error', default: false },
    submitLabel: { type: 'text', label: 'Submit label', default: 'Create account' },
  },
  render: ({ required, serverInvalid, submitLabel }) => (
    <FormRoot
      style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}
      onSubmit={(e) => e.preventDefault()}
    >
      <FormField name="name">
        <FormLabel>Full name</FormLabel>
        <FormControl>
          <TextInput width="fill" required={required} placeholder="Ada Lovelace" />
        </FormControl>
        <FormMessage match="valueMissing">Please enter your name.</FormMessage>
      </FormField>

      <FormField name="email" serverInvalid={serverInvalid}>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <TextInput width="fill" type="email" required={required} placeholder="you@example.com" />
        </FormControl>
        <FormMessage match="valueMissing">Please enter your email.</FormMessage>
        <FormMessage match="typeMismatch">Please enter a valid email.</FormMessage>
        {serverInvalid && <FormMessage>That email is already taken.</FormMessage>}
      </FormField>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <Button type="reset" variant="secondary">
          Cancel
        </Button>
        <FormSubmit>
          <Button>{submitLabel}</Button>
        </FormSubmit>
      </div>
    </FormRoot>
  ),
});
