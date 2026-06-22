import { Button } from 'ui/components/button';
import { SFSymbol } from 'ui/components/sf-symbol';
import { Icon } from 'ui/components/icon';
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
      <Button prefixSlot={<Icon icon="check" size="md" />}>
        With prefix
      </Button>
      <Button variant="secondary" suffixSlot={<Icon icon="chevron-right" size="md" />}>
        With suffix
      </Button>
      <Button
        prefixSlot={<Icon icon="check" size="md" />}
        suffixSlot={<Icon icon="chevron-right" size="md" />}
      >
        Both slots
      </Button>
      <Button disabled>Disabled</Button>
      <Button width="square" aria-label="Square icon">
        <Icon icon="check" size="md" />
      </Button>
      <Button width="square" round aria-label="Round icon">
        <Icon icon="check" size="md" />
      </Button>
      <Button variant="secondary" round>
        Pill
      </Button>
      <div className={styles.fillBox}>
        <Button width="fill" suffixSlot={<Icon icon="chevron-right" size="md" />}>
          Fill width
        </Button>
      </div>
      <div className={styles.sizeRow}>
        <Button size="sm" variant="secondary">Small</Button>
        <Button size="md" variant="secondary">Medium</Button>
        <Button size="lg" variant="secondary">Large</Button>
        <Button size="xl" variant="secondary">Extra large</Button>
        <Button size="sm" width="square" variant="secondary" aria-label="Small square">
          <Icon icon="check" size="md" />
        </Button>
        <Button size="xl" width="square" variant="secondary" aria-label="XL square">
          <Icon icon="check" size="md" />
        </Button>
      </div>
    </Section>
  );
}
