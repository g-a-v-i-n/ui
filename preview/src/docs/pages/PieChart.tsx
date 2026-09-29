import { PieChart } from 'ui/components/pie-chart';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description:
    'A ring that fills clockwise to a percentage, for compact progress and quota readouts.',
  controls: {
    percent: { type: 'number', min: 0, max: 100, step: 1, default: 25 },
    size: { type: 'number', label: 'Size (px)', min: 16, max: 96, step: 8, default: 48 },
  },
  render: ({ percent, size }) => <PieChart percent={percent} width={size} height={size} />,
});
