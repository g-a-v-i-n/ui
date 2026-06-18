import { useState } from 'react';
import { Radio } from 'ui/components/radio';
import { RadioGroup } from 'ui/components/radio-group';
import { Text } from 'ui/components/text';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function RadioSection() {
  const [radioValue, setRadioValue] = useState('medium');

  return (
    <Section title="Radio">
      <RadioGroup value={radioValue} onValueChange={setRadioValue}>
        <label className={styles.option}>
          <Radio value="small" id="r-small" />
          <Text size="sm" as="span">Small</Text>
        </label>
        <label className={styles.option}>
          <Radio value="medium" id="r-medium" />
          <Text size="sm" as="span">Medium</Text>
        </label>
        <label className={styles.option}>
          <Radio value="large" id="r-large" />
          <Text size="sm" as="span">Large</Text>
        </label>
        <label className={styles.optionDisabled}>
          <Radio value="disabled" id="r-disabled" disabled />
          <Text size="sm" as="span">Disabled</Text>
        </label>
      </RadioGroup>
    </Section>
  );
}
