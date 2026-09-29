import { Button } from 'ui/components/button';
import {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from 'ui/components/alert-dialog';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description:
    'A dialog that interrupts with a decision. Unlike Dialog it never dismisses on an outside click; the user must choose.',
  controls: {
    title: { type: 'text', default: 'Delete this file?' },
    description: {
      type: 'text',
      default: 'This action cannot be undone. The file will be permanently removed.',
    },
    actionLabel: { type: 'text', label: 'Action label', default: 'Delete' },
    actionVariant: {
      type: 'segmented',
      label: 'Action variant',
      options: ['primary', 'secondary', 'destructive'],
      default: 'primary',
    },
    defaultOpen: { type: 'boolean', label: 'Initially open', default: false },
  },
  /* Uncontrolled so the example stays interactive; the key remounts it when
     the initial state control changes. */
  render: ({ title, description, actionLabel, actionVariant, defaultOpen }) => (
    <AlertDialogRoot key={String(defaultOpen)} defaultOpen={defaultOpen}>
      <AlertDialogTrigger>
        <Button variant="secondary">Delete file…</Button>
      </AlertDialogTrigger>
      <AlertDialogContent style={{ width: 400 }}>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant={actionVariant}>{actionLabel}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  ),
});
