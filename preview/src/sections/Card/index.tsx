import { Card } from 'ui/components/card';
import { Text } from 'ui/components/text';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function CardSection() {
  return (
    <Section title="Card">
      <Card variant="primary" className={styles.card}>
        <Text size="sm" weight="medium">Primary</Text>
        <Text size="sm" color="secondary">
          bg-primary with a card shadow.
        </Text>
      </Card>
      <Card variant="secondary" className={styles.card}>
        <Text size="sm" weight="medium">Secondary</Text>
        <Text size="sm" color="secondary">
          Flat, bg-secondary, no shadow.
        </Text>
      </Card>
    </Section>
  );
}
