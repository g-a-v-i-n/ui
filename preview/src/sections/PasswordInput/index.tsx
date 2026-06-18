import { useState } from 'react';
import { SFSymbol } from 'ui/components/sf-symbol';
import { PasswordInput } from 'ui/components/password-input';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function PasswordInputSection() {
  const [password, setPassword] = useState('');

  return (
    <Section title="PasswordInput">
      <div className={styles.column}>
        <PasswordInput
          width="fill"
          placeholder="Enter password…"
          value={password}
          onValueChange={setPassword}
        />
        <PasswordInput
          width="fill"
          placeholder="With prefix…"
          defaultValue="hunter2"
          prefixSlot={<SFSymbol symbol="􀎠" size="sm" />}
        />
      </div>
    </Section>
  );
}
