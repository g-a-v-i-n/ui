import { useState } from 'react';
import { Text } from 'ui/components/text';
import { Combobox } from 'ui/components/combobox';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function ComboboxSection() {
  const [comboValue, setComboValue] = useState('');

  return (
    <Section title="Combobox">
      <div className={styles.wrap}>
        <Combobox
          width="fill"
          placeholder="Search a framework…"
          value={comboValue}
          onValueChange={setComboValue}
          items={[
            { value: 'react', label: 'React' },
            { value: 'vue', label: 'Vue' },
            { value: 'svelte', label: 'Svelte' },
            { value: 'solid', label: 'Solid' },
            { value: 'angular', label: 'Angular' },
            { value: 'qwik', label: 'Qwik (coming soon)', disabled: true },
            { value: 'preact', label: 'Preact' },
          ]}
        />
        <Text size="sm" color="secondary">
          selected: {comboValue || '—'}
        </Text>
      </div>
    </Section>
  );
}
