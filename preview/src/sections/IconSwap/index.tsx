import { useState } from 'react';
import { SFSymbol } from 'ui/components/sf-symbol';
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
          <SFSymbol symbol={playing ? '􀊆' : '􀊄'} size="sm" />
        </IconSwap>
      </Button>
      <Button
        variant="secondary"
        onClick={() => setStarred((s) => !s)}
        prefixSlot={
          <IconSwap swapKey={starred}>
            <SFSymbol
              symbol={starred ? '􀋃' : '􀋂'}
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
