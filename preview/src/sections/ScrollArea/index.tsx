import { Text } from 'ui/components/text';
import { ScrollArea } from 'ui/components/scroll-area';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function ScrollAreaSection() {
  return (
    <Section title="ScrollArea">
      <ScrollArea className={styles.scrollArea}>
        <div className={styles.content}>
          {Array.from({ length: 20 }, (_, i) => (
            <Text key={i} size="sm" color="secondary">
              Scrollable row {i + 1}
            </Text>
          ))}
        </div>
      </ScrollArea>
    </Section>
  );
}
