import { Text } from 'ui/components/text';
import { Separator } from 'ui/components/separator';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function SeparatorSection() {
  return (
    <Section title="Separator">
      <div className={styles.column}>
        <Text size="sm">Above</Text>
        <Separator />
        <Text size="sm">Below</Text>
      </div>
      <div className={styles.row}>
        <Text size="sm">Left</Text>
        <Separator orientation="vertical" />
        <Text size="sm">Right</Text>
      </div>
    </Section>
  );
}
