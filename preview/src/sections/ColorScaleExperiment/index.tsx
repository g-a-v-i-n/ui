import { Text } from 'ui/components/text';
import { Section } from '../../Section';
import styles from './styles.module.css';

const STEPS = Array.from({ length: 12 }, (_, index) => index + 1);

export function ColorScaleExperimentSection() {
  return (
    <Section title="Color scale experiment">
      <div className={styles.root}>
        <ScaleRow title="Radix blue" prefix="blue" />
        <ScaleRow title="Saturated alias" prefix="test-blue" />
      </div>
    </Section>
  );
}

function ScaleRow({ title, prefix }: { title: string; prefix: string }) {
  return (
    <div className={styles.row}>
      <Text as="div" size="sm" color="secondary">
        {title}
      </Text>
      <div className={styles.scale}>
        {STEPS.map((step) => (
          <div key={step} className={styles.cell}>
            <span
              className={styles.swatch}
              style={{ background: `var(--${prefix}-${step})` }}
            />
            <Text as="code" size="xs" mono color="tertiary" className={styles.label}>
              {step}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}
