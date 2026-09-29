import { Button } from 'ui/components/button';
import { Tooltip } from 'ui/components/tooltip';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description:
    'A short hint that appears on hover or focus. Wrap the trigger; the app mounts one TooltipProvider so delays are shared.',
  controls: {
    content: { type: 'text', default: 'Plain hint' },
    side: { type: 'segmented', options: ['top', 'right', 'bottom', 'left'], default: 'top' },
    align: { type: 'segmented', options: ['start', 'center', 'end'], default: 'center' },
    delayDuration: { type: 'number', label: 'Delay (ms)', default: 200, min: 0, max: 1000, step: 50 },
    defaultOpen: { type: 'boolean', label: 'Initially open', default: false },
  },
  /* Uncontrolled so the example stays interactive; the key remounts it when
     the initial state control changes. */
  render: ({ content, side, align, delayDuration, defaultOpen }) => (
    <Tooltip
      key={String(defaultOpen)}
      defaultOpen={defaultOpen}
      content={content}
      side={side}
      align={align}
      delayDuration={delayDuration}
    >
      <Button variant="secondary">Hover me</Button>
    </Tooltip>
  ),
});
