import { Button } from 'ui/components/button';
import { Icon } from 'ui/components/icon';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function ButtonSection() {
  return (
    <Section title="Button">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="destructive" prefixSlot={<Icon icon="xmark" size="lg" />}>
        Delete with icon
      </Button>
      <Button variant="destructive" disabled>
        Delete disabled
      </Button>
      <Button prefixSlot={<Icon icon="check" size="lg" />}>
        With prefix
      </Button>
      <Button variant="secondary" suffixSlot={<Icon icon="chevron-right" size="lg" />}>
        With suffix
      </Button>
      <Button
        prefixSlot={<Icon icon="check" size="lg" />}
        suffixSlot={<Icon icon="chevron-right" size="lg" />}
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
        <Button width="fill" suffixSlot={<Icon icon="chevron-right" size="lg" />}>
          Fill width
        </Button>
      </div>
      <div className={styles.sizeRow}>
        <Button size="xs" variant="secondary">Extra small</Button>
        <Button size="sm" variant="secondary">Small</Button>
        <Button size="md" variant="secondary">Medium</Button>
        <Button size="lg" variant="secondary">Large</Button>
        <Button size="xl" variant="secondary">Extra large</Button>
        <Button size="xs" width="square" variant="secondary" aria-label="XS square">
          <Icon icon="check" size="md" />
        </Button>
        <Button size="xl" width="square" variant="secondary" aria-label="XL square">
          <Icon icon="check" size="md" />
        </Button>
      </div>
    </Section>
  );
}
