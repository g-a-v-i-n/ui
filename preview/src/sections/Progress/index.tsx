import { useState } from 'react';
import { Progress } from 'ui/components/progress';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function ProgressSection() {
  const [progressValue, setProgressValue] = useState(60);

  return (
    <Section title="Progress">
      <div className={styles.bar}>
        <Progress value={progressValue} />
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={progressValue}
        onChange={(e) => setProgressValue(Number(e.target.value))}
      />
      <div className={styles.bar}>
        <Progress value={progressValue} animated />
      </div>
    </Section>
  );
}
