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
import { Section } from '../../Section';

export function AlertDialogSection() {
  return (
    <Section title="AlertDialog">
      <AlertDialogRoot>
        <AlertDialogTrigger>
          <Button variant="secondary">Delete file…</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Delete this file?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The file will be permanently removed.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogRoot>
    </Section>
  );
}
