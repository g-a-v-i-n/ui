import { MiddleDot } from 'ui/components/middle-dot';
import { Text } from 'ui/components/text';
import { Section } from '../../Section';

export function MiddleDotSection() {
  return (
    <Section title="MiddleDot">
      <Text size="sm">item one</Text>
      <MiddleDot />
      <Text size="sm">item two</Text>
      <MiddleDot />
      <Text size="sm">item three</Text>
    </Section>
  );
}
