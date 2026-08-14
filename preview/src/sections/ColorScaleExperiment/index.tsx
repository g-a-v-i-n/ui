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
      <div className={styles.title}>{title}</div>
      <div className={styles.scale}>
        {STEPS.map((step) => (
          <div key={step} className={styles.cell}>
            <span
              className={styles.swatch}
              style={{ background: `var(--${prefix}-${step})` }}
            />
            <code className={styles.label}>{step}</code>
          </div>
        ))}
      </div>
    </div>
  );
}
