import { useState } from 'react';
import { Button } from 'ui/components/button';
import { Icon, type IconName } from 'ui/components/icon';
import { IconSwap } from 'ui/components/icon-swap';
import { defineDoc } from '../types';

const pairs = {
  'Play / pause': { icons: ['play-fill', 'pause-fill'], labels: ['Play', 'Pause'] },
  'Star / starred': { icons: ['star', 'star-fill'], labels: ['Star', 'Starred'] },
  'Chevron down / up': { icons: ['chevron-down', 'chevron-up'], labels: ['Expand', 'Collapse'] },
  'Sun / moon': { icons: ['sun', 'moon'], labels: ['Light', 'Dark'] },
} satisfies Record<string, { icons: [IconName, IconName]; labels: [string, string] }>;

type Pair = keyof typeof pairs;
const pairNames = Object.keys(pairs) as Pair[];

/* IconSwap only animates when its key changes, so the example owns the
   toggled state; the controls tune the transition. */
function Example({
  pair,
  mode,
  duration,
  scale,
}: {
  pair: Pair;
  mode: 'wait' | 'popLayout' | 'sync';
  duration: number;
  scale: number;
}) {
  const [on, setOn] = useState(false);
  const {
    icons: [offIcon, onIcon],
    labels: [offLabel, onLabel],
  } = pairs[pair];
  return (
    <Button
      variant="secondary"
      width="square"
      aria-label={on ? onLabel : offLabel}
      onClick={() => setOn((prev) => !prev)}
    >
      <IconSwap swapKey={on} mode={mode} duration={duration} scale={scale}>
        <Icon icon={on ? onIcon : offIcon} size="md" />
      </IconSwap>
    </Button>
  );
}

export const doc = defineDoc({
  description:
    'Cross-fades between icons when its key changes, for toggles that swap their glyph.',
  controls: {
    pair: { type: 'select', label: 'Icons', options: pairNames, default: 'Play / pause' },
    mode: { type: 'segmented', options: ['wait', 'popLayout', 'sync'], default: 'wait' },
    duration: { type: 'number', label: 'Duration (s)', min: 0.04, max: 0.4, step: 0.02, default: 0.08 },
    scale: { type: 'number', min: 0, max: 1, step: 0.1, default: 0.5 },
  },
  render: ({ pair, mode, duration, scale }) => (
    <Example pair={pair} mode={mode} duration={duration} scale={scale} />
  ),
});
