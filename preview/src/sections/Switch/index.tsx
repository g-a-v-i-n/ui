import { useState } from 'react';
import { Switch } from 'ui/components/switch';
import { Section } from '../../Section';

export function SwitchSection() {
  const [switchA, setSwitchA] = useState(false);
  const [switchB, setSwitchB] = useState(true);

  return (
    <Section title="Switch">
      <Switch checked={switchA} onCheckedChange={setSwitchA} />
      <Switch checked={switchB} onCheckedChange={setSwitchB} />
      <Switch checked disabled />
      <Switch disabled />
    </Section>
  );
}
