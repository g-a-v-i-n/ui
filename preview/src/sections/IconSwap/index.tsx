import { useState } from 'react';
import { Icon } from 'ui/components/icon';
import { Button } from 'ui/components/button';
import { IconSwap } from 'ui/components/icon-swap';
import { Section } from '../../Section';

export function IconSwapSection() {
  const [playing, setPlaying] = useState(false);
  const [starred, setStarred] = useState(false);

  return (
    <Section title="IconSwap">
      <Button
        variant="secondary"
        width="square"
        aria-label={playing ? 'Pause' : 'Play'}
        onClick={() => setPlaying((p) => !p)}
      >
        <IconSwap swapKey={playing}>
          <Icon icon={playing ? 'pause-fill' : 'play-fill'} size="sm" />
        </IconSwap>
      </Button>
      <Button
        variant="secondary"
        onClick={() => setStarred((s) => !s)}
        prefixSlot={
          <IconSwap swapKey={starred}>
            <Icon
              icon={starred ? 'star-fill' : 'star'}
              size="sm"
              style={starred ? { color: 'var(--amber-10)' } : undefined}
            />
          </IconSwap>
        }
      >
        {starred ? 'Starred' : 'Star'}
      </Button>
    </Section>
  );
}
