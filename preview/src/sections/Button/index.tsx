import { Button } from 'ui/components/button';
import { SFSymbol } from 'ui/components/sf-symbol';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function ButtonSection() {
  return (
    <Section title="Button">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="destructive" prefixSlot={<SFSymbol symbol="􀈑" size="sm" />}>
        Delete with icon
      </Button>
      <Button variant="destructive" disabled>
        Delete disabled
      </Button>
      <Button prefixSlot={<SFSymbol symbol="✓" size="sm" weight="semibold" />}>
        With prefix
      </Button>
      <Button variant="secondary" suffixSlot={<SFSymbol symbol="􀆊" size="sm" />}>
        With suffix
      </Button>
      <Button
        prefixSlot={<SFSymbol symbol="✓" size="sm" weight="semibold" />}
        suffixSlot={<SFSymbol symbol="􀆊" size="sm" />}
      >
        Both slots
      </Button>
      <Button disabled>Disabled</Button>
      <Button width="square" aria-label="Square icon">
        <SFSymbol symbol="✓" size="sm" weight="semibold" />
      </Button>
      <Button width="square" round aria-label="Round icon">
        <SFSymbol symbol="✓" size="sm" weight="semibold" />
      </Button>
      <Button variant="secondary" round>
        Pill
      </Button>
      <div className={styles.fillBox}>
        <Button width="fill" suffixSlot={<SFSymbol symbol="􀆊" size="sm" />}>
          Fill width
        </Button>
      </div>
      <div className={styles.sizeRow}>
        <Button size="sm" variant="secondary">Small</Button>
        <Button size="md" variant="secondary">Medium</Button>
        <Button size="lg" variant="secondary">Large</Button>
        <Button size="xl" variant="secondary">Extra large</Button>
        <Button size="sm" width="square" variant="secondary" aria-label="Small square">
          <SFSymbol symbol="✓" size="sm" />
        </Button>
        <Button size="xl" width="square" variant="secondary" aria-label="XL square">
          <SFSymbol symbol="✓" />
        </Button>
      </div>
    </Section>
  );
}
