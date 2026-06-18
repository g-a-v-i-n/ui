import { Text } from 'ui/components/text';
import { GradientMask } from 'ui/components/gradient-mask';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function GradientMaskSection() {
  return (
    <Section title="GradientMask">
      <div className={styles.frame}>
        <GradientMask direction="top" color="var(--bg-secondary)" />
        <GradientMask direction="bottom" color="var(--bg-secondary)" />
        <div className={styles.scroll}>
          {Array.from({ length: 24 }, (_, i) => (
            <Text key={i} size="sm" color="secondary">
              Scrollable row {i + 1}
            </Text>
          ))}
        </div>
      </div>
    </Section>
  );
}
