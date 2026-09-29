import { Button } from 'ui/components/button';
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from 'ui/components/dialog';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description:
    'A window layered over the page for a focused task. Modal by default: it traps focus and dismisses on escape or an outside click.',
  controls: {
    title: { type: 'text', default: 'Confirm action' },
    description: {
      type: 'text',
      default: 'This is a dialog rendered from the ui package. Press escape or click outside to dismiss.',
    },
    actions: { type: 'boolean', label: 'With actions', default: true },
    modal: { type: 'boolean', default: true },
    defaultOpen: { type: 'boolean', label: 'Initially open', default: false },
  },
  /* Uncontrolled so the example stays interactive; the key remounts it when
     the initial state control changes. */
  render: ({ title, description, actions, modal, defaultOpen }) => (
    <DialogRoot key={String(defaultOpen)} defaultOpen={defaultOpen} modal={modal}>
      <DialogTrigger>
        <Button variant="secondary">Open dialog</Button>
      </DialogTrigger>
      <DialogContent style={{ width: 400 }}>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        {actions && (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>Confirm</Button>
            </DialogClose>
          </div>
        )}
      </DialogContent>
    </DialogRoot>
  ),
});
