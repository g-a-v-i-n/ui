import { useState } from 'react';
import { Progress } from 'ui/components/progress';
import { Section } from '../../Section';

export function ProgressSection() {
  const [progressValue, setProgressValue] = useState(60);

  return (
    <Section title="Progress">
      <div style={{ width: 240 }}>
        <Progress value={progressValue} />
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={progressValue}
        onChange={(e) => setProgressValue(Number(e.target.value))}
      />
      <div style={{ width: 240 }}>
        <Progress value={progressValue} animated />
      </div>
    </Section>
  );
}
