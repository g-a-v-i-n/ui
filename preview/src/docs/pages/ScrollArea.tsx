import { ScrollArea } from 'ui/components/scroll-area';
import { Text } from 'ui/components/text';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description:
    'A scrollable region with themed scrollbars in place of the native ones. The scrollbars appear on hover by default.',
  propsFor: [
    'ScrollArea',
    'ScrollAreaRoot',
    'ScrollAreaViewport',
    'ScrollAreaScrollbar',
    'ScrollAreaThumb',
    'ScrollAreaCorner',
  ],
  controls: {
    type: { type: 'select', options: ['hover', 'scroll', 'auto', 'always'], default: 'hover' },
    rows: { type: 'number', default: 20, min: 1, max: 50, step: 1 },
    wide: { type: 'boolean', label: 'Wide rows', default: false },
  },
  render: ({ type, rows, wide }) => (
    <ScrollArea
      type={type}
      style={{
        width: 240,
        height: 160,
        borderRadius: 12,
        boxShadow: 'var(--shadow-card)',
        background: 'var(--bg-primary)',
      }}
    >
      <div
        style={{
          padding: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          minWidth: wide ? 480 : undefined,
        }}
      >
        {Array.from({ length: rows }, (_, i) => (
          <Text key={i} size="sm" color="secondary" style={{ whiteSpace: 'nowrap' }}>
            {wide ? `Scrollable row ${i + 1}, wide enough to overflow sideways` : `Scrollable row ${i + 1}`}
          </Text>
        ))}
      </div>
    </ScrollArea>
  ),
});
