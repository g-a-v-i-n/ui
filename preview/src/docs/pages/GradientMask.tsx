import { GradientMask } from 'ui/components/gradient-mask';
import { Text } from 'ui/components/text';
import { defineDoc } from '../types';

const opposite = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' } as const;

export const doc = defineDoc({
  description:
    'Fades out one edge of a scroll container so clipped content trails off instead of cutting off.',
  controls: {
    direction: { type: 'segmented', options: ['top', 'bottom', 'left', 'right'], default: 'top' },
    size: { type: 'number', label: 'Size (px)', min: 8, max: 64, step: 4, default: 24 },
    blur: { type: 'number', label: 'Blur (px)', min: 1, max: 24, step: 1, default: 6 },
    bothEnds: { type: 'boolean', label: 'Mask both ends', default: false },
  },
  /* The frame is the positioned, non-scrolling wrapper the mask anchors to.
     Its background is --bg-primary, which is also the mask's default color. */
  render: ({ direction, size, blur, bothEnds }) => {
    const horizontal = direction === 'left' || direction === 'right';
    return (
      <div
        style={{
          position: 'relative',
          width: 240,
          height: 160,
          overflow: 'hidden',
          borderRadius: 12,
          background: 'var(--bg-primary)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <GradientMask direction={direction} size={size} blur={blur} />
        {bothEnds && <GradientMask direction={opposite[direction]} size={size} blur={blur} />}
        <div
          style={{
            height: '100%',
            overflow: 'auto',
            padding: 12,
            display: 'flex',
            flexDirection: horizontal ? 'row' : 'column',
            gap: horizontal ? 16 : 6,
          }}
        >
          {Array.from({ length: 24 }, (_, i) => (
            <Text key={i} size="sm" color="secondary" style={{ flex: 'none', whiteSpace: 'nowrap' }}>
              {horizontal ? `Item ${i + 1}` : `Scrollable row ${i + 1}`}
            </Text>
          ))}
        </div>
      </div>
    );
  },
});
