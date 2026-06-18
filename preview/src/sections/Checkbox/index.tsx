import { useState } from 'react';
import { Checkbox } from 'ui/components/checkbox';
import { CheckboxRow } from 'ui/components/checkbox-row';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function CheckboxSection() {
  const [cbA, setCbA] = useState(false);
  const [cbB, setCbB] = useState(true);
  const [rowChecked, setRowChecked] = useState(false);

  return (
    <Section title="Checkbox">
      <Checkbox id="cb-a" checked={cbA} onCheckedChange={(v) => setCbA(Boolean(v))} />
      <Checkbox id="cb-b" checked={cbB} onCheckedChange={(v) => setCbB(Boolean(v))} />
      <div className={styles.rowBox}>
        <CheckboxRow
          id="cb-row"
          label="Subscribe to updates"
          checked={rowChecked}
          onCheckedChange={setRowChecked}
        />
      </div>
    </Section>
  );
}
