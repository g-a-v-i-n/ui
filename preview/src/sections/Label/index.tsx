import { useState } from 'react';
import { Switch } from 'ui/components/switch';
import { Label } from 'ui/components/label';
import { Section } from '../../Section';

export function LabelSection() {
  const [switchA, setSwitchA] = useState(false);

  return (
    <Section title="Label">
      <Label htmlFor="label-demo">Notifications</Label>
      <Switch id="label-demo" checked={switchA} onCheckedChange={setSwitchA} />
      <Label color="secondary" weight="regular">
        Secondary regular label
      </Label>
    </Section>
  );
}
