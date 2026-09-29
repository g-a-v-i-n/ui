import { useState } from 'react';
import { Button } from 'ui/components/button';
import { Callout } from 'ui/components/callout';
import { defineDoc } from '../types';

type Variant = 'info' | 'success' | 'warning' | 'error';

/* `onClose` only renders the dismiss button; this wrapper owns the visibility
   so dismissing actually hides the callout, and offers a way to bring it back. */
function DismissibleCallout({
  variant,
  title,
  children,
}: {
  variant: Variant;
  title: string;
  children: string;
}) {
  const [open, setOpen] = useState(true);
  if (!open) {
    return (
      <Button variant="secondary" size="md" onClick={() => setOpen(true)}>
        Show callout again
      </Button>
    );
  }
  return (
    <Callout variant={variant} title={title} onClose={() => setOpen(false)}>
      {children}
    </Callout>
  );
}

export const doc = defineDoc({
  description:
    'An inline message that draws attention to information, a success, a warning, or an error.',
  controls: {
    variant: { type: 'segmented', options: ['info', 'success', 'warning', 'error'], default: 'info' },
    title: { type: 'text', default: 'Heads up' },
    children: { type: 'text', label: 'Body', default: 'This is an inline callout.' },
    dismissible: { type: 'boolean', default: false },
  },
  render: ({ variant, title, children, dismissible }) => (
    <div style={{ width: 360, display: 'flex', justifyContent: 'center' }}>
      {dismissible ? (
        <DismissibleCallout variant={variant} title={title}>
          {children}
        </DismissibleCallout>
      ) : (
        <Callout variant={variant} title={title} style={{ width: '100%' }}>
          {children}
        </Callout>
      )}
    </div>
  ),
});
