import { Radio } from 'ui/components/radio';
import { RadioGroup } from 'ui/components/radio-group';
import { Text } from 'ui/components/text';
import { defineDoc } from '../types';

const option = { display: 'inline-flex', alignItems: 'center', gap: 8 } as const;

export const doc = defineDoc({
  description: 'Picks exactly one option from a small, always-visible set.',
  modules: ['radio', 'radio-group'],
  controls: {
    preselected: { type: 'boolean', label: 'Preselect a value', default: true },
    disabledOption: { type: 'boolean', label: 'Disable an option', default: false },
    disabled: { type: 'boolean', label: 'Disable the group', default: false },
  },
  /* Uncontrolled so the example stays interactive; the key remounts it when
     the initial state control changes. */
  render: ({ preselected, disabledOption, disabled }) => (
    <RadioGroup
      key={String(preselected)}
      defaultValue={preselected ? 'medium' : undefined}
      disabled={disabled}
      aria-label="Size"
    >
      <label style={option}>
        <Radio value="small" />
        <Text size="sm" as="span">Small</Text>
      </label>
      <label style={option}>
        <Radio value="medium" />
        <Text size="sm" as="span">Medium</Text>
      </label>
      <label style={{ ...option, opacity: disabledOption ? 0.6 : 1 }}>
        <Radio value="large" disabled={disabledOption} />
        <Text size="sm" as="span">Large</Text>
      </label>
    </RadioGroup>
  ),
});
