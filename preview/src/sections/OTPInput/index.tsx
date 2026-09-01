import { useState } from 'react';
import { Text } from 'ui/components/text';
import { OTPInput } from 'ui/components/otp-input';
import { Section } from '../../Section';

export function OTPInputSection() {
  const [otp, setOtp] = useState('');

  return (
    <Section title="OTPInput" layout="column" gap={12}>
        <OTPInput value={otp} onValueChange={setOtp} />
        <Text size="sm" color="secondary" tabularNumbers>
          value: {otp || '—'}
        </Text>
        <OTPInput length={4} disabled defaultValue="12" />
    </Section>
  );
}
