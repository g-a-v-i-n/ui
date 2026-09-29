import { Separator } from 'ui/components/separator';
import { Text } from 'ui/components/text';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description:
    'A thin rule that divides content in either orientation. Mark it decorative when the division is purely visual.',
  controls: {
    orientation: { type: 'segmented', options: ['horizontal', 'vertical'], default: 'horizontal' },
    decorative: { type: 'boolean', default: false },
  },
  render: ({ orientation, decorative }) =>
    orientation === 'vertical' ? (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 24 }}>
        <Text size="sm">Left</Text>
        <Separator orientation="vertical" decorative={decorative} />
        <Text size="sm">Right</Text>
      </div>
    ) : (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 240 }}>
        <Text size="sm">Above</Text>
        <Separator orientation="horizontal" decorative={decorative} />
        <Text size="sm">Below</Text>
      </div>
    ),
});
