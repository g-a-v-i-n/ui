import { Avatar } from 'ui/components/avatar';
import { Button } from 'ui/components/button';
import { HoverCardRoot, HoverCardTrigger, HoverCardContent } from 'ui/components/hover-card';
import { Text } from 'ui/components/text';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description:
    'A preview card that opens on hover, for sighted users to peek at a link or entity without leaving the page.',
  controls: {
    width: { type: 'segmented', options: ['sm', 'md', 'lg', 'auto'], default: 'md' },
    side: { type: 'segmented', options: ['top', 'right', 'bottom', 'left'], default: 'bottom' },
    align: { type: 'segmented', options: ['start', 'center', 'end'], default: 'center' },
    openDelay: { type: 'number', label: 'Open delay (ms)', default: 300, min: 0, max: 1000, step: 50 },
    closeDelay: { type: 'number', label: 'Close delay (ms)', default: 100, min: 0, max: 1000, step: 50 },
    defaultOpen: { type: 'boolean', label: 'Initially open', default: false },
  },
  /* Uncontrolled so the example stays interactive; the key remounts it when
     the initial state control changes. */
  render: ({ width, side, align, openDelay, closeDelay, defaultOpen }) => (
    <HoverCardRoot
      key={String(defaultOpen)}
      defaultOpen={defaultOpen}
      openDelay={openDelay}
      closeDelay={closeDelay}
    >
      <HoverCardTrigger>
        <Button variant="secondary">Hover for card</Button>
      </HoverCardTrigger>
      <HoverCardContent width={width} side={side} align={align}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Avatar size="lg" fallback="UI" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Text size="sm" weight="medium">
              ui library
            </Text>
            <Text size="xs" color="secondary">
              Radix primitives, styled.
            </Text>
          </div>
        </div>
      </HoverCardContent>
    </HoverCardRoot>
  ),
});
