import { Icon } from 'ui/components/icon';
import { Toggle } from 'ui/components/toggle';
import { Section } from '../../Section';

export function ToggleSection() {
  return (
    <Section title="Toggle">
      <Toggle defaultPressed>Bold</Toggle>
      <Toggle>Italic</Toggle>
      <Toggle aria-label="Toggle check">
        <Icon icon="check" size="md" />
      </Toggle>
      <Toggle disabled>Disabled</Toggle>
    </Section>
  );
}
