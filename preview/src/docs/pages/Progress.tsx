import { Progress } from 'ui/components/progress';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description: 'A horizontal bar showing how much of a task is complete.',
  controls: {
    value: { type: 'number', default: 60, min: 0, max: 100, step: 1 },
    animated: { type: 'boolean', default: false },
  },
  render: ({ value, animated }) => (
    <div style={{ width: 240 }}>
      <Progress value={value} animated={animated} aria-label="Upload progress" />
    </div>
  ),
});
