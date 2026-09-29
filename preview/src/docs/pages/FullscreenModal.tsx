import { useState } from 'react';
import { Button } from 'ui/components/button';
import { FullscreenModal } from 'ui/components/fullscreen-modal';
import { Text } from 'ui/components/text';
import { defineDoc } from '../types';

type ExampleProps = { tooltip: boolean; hideCloseButton: boolean; disableClose: boolean };

/* The modal exposes no Close part of its own, so the example owns `open` and
   renders a Done button: a way out even when `disableClose` removes both the
   escape key and the close button. */
function Example({ tooltip, hideCloseButton, disableClose }: ExampleProps) {
  const [open, setOpen] = useState(false);
  return (
    <FullscreenModal
      open={open}
      onOpenChange={setOpen}
      title="Fullscreen example"
      description="A fullscreen takeover with a close button in the top left."
      trigger={<Button variant="secondary">Open fullscreen</Button>}
      triggerTooltip={tooltip ? 'Takes over the whole viewport' : undefined}
      hideCloseButton={hideCloseButton}
      disableClose={disableClose}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
        }}
      >
        <Text size="lg" weight="medium">
          Fullscreen content
        </Text>
        <Text size="sm" color="secondary">
          {disableClose
            ? 'Escape and the close button are disabled; only Done closes it.'
            : 'Press escape or the close button to leave.'}
        </Text>
        <Button variant="secondary" onClick={() => setOpen(false)}>
          Done
        </Button>
      </div>
    </FullscreenModal>
  );
}

export const doc = defineDoc({
  description:
    'A takeover that fills the viewport, for focused flows like editors and previews. Its title and description are announced, not shown.',
  controls: {
    tooltip: { type: 'boolean', label: 'Trigger tooltip', default: true },
    hideCloseButton: { type: 'boolean', label: 'Hide close button', default: false },
    disableClose: { type: 'boolean', label: 'Disable close', default: false },
  },
  render: ({ tooltip, hideCloseButton, disableClose }) => (
    <Example tooltip={tooltip} hideCloseButton={hideCloseButton} disableClose={disableClose} />
  ),
});
