import { useState } from 'react';
import { PieChart } from 'ui/components/pie-chart';
import { Section } from '../../Section';

export function PieChartSection() {
  const [piePercent, setPiePercent] = useState(25);

  return (
    <Section title="PieChart">
      <PieChart percent={piePercent} />
      <PieChart percent={50} />
      <PieChart percent={75} />
      <PieChart percent={100} />
      <input
        type="range"
        min={0}
        max={100}
        value={piePercent}
        onChange={(e) => setPiePercent(Number(e.target.value))}
      />
    </Section>
  );
}
