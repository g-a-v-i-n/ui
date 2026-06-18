import { useState } from 'react';
import { Text } from 'ui/components/text';
import { OTPInput } from 'ui/components/otp-input';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function OTPInputSection() {
  const [otp, setOtp] = useState('');

  return (
    <Section title="OTPInput">
      <div className={styles.column}>
        <OTPInput value={otp} onValueChange={setOtp} />
        <Text size="sm" color="secondary" tabularNumbers>
          value: {otp || '—'}
        </Text>
        <OTPInput length={4} disabled defaultValue="12" />
      </div>
    </Section>
  );
}
