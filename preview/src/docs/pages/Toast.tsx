import { useState } from 'react';
import { Button } from 'ui/components/button';
import {
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
} from 'ui/components/toast';
import { defineDoc } from '../types';

type ExampleProps = {
  title: string;
  description: boolean;
  action: boolean;
  close: boolean;
  duration: number;
};

/* `open` is controlled so the button can show the toast again after it times
   out or is dismissed. It renders into the ToastViewport the app mounts. */
function Example({ title, description, action, close, duration }: ExampleProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Show toast
      </Button>
      <ToastRoot open={open} onOpenChange={setOpen} duration={duration}>
        <ToastTitle>{title}</ToastTitle>
        {description && <ToastDescription>Your changes have been saved.</ToastDescription>}
        {action && (
          <ToastAction altText="Undo save" onClick={() => setOpen(false)}>
            Undo
          </ToastAction>
        )}
        {close && <ToastClose />}
      </ToastRoot>
    </>
  );
}

export const doc = defineDoc({
  description:
    'A brief, non-blocking notice that slides in at the corner and times out, with an optional action.',
  controls: {
    title: { type: 'text', default: 'File saved' },
    description: { type: 'boolean', label: 'With description', default: true },
    action: { type: 'boolean', label: 'With action', default: true },
    close: { type: 'boolean', label: 'Close button', default: true },
    duration: { type: 'number', label: 'Duration (ms)', default: 4000, min: 1000, max: 10000, step: 500 },
  },
  render: ({ title, description, action, close, duration }) => (
    <Example
      title={title}
      description={description}
      action={action}
      close={close}
      duration={duration}
    />
  ),
});
