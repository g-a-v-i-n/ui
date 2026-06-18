import { SFSymbol } from 'ui/components/sf-symbol';
import { Toggle } from 'ui/components/toggle';
import { Section } from '../../Section';

export function ToggleSection() {
  return (
    <Section title="Toggle">
      <Toggle defaultPressed>Bold</Toggle>
      <Toggle>Italic</Toggle>
      <Toggle aria-label="Toggle check">
        <SFSymbol symbol="✓" size="sm" />
      </Toggle>
      <Toggle disabled>Disabled</Toggle>
    </Section>
  );
}
