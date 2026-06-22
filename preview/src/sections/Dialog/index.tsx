import { Button } from 'ui/components/button';
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from 'ui/components/dialog';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function DialogSection() {
  return (
    <Section title="Dialog">
      <DialogRoot>
        <DialogTrigger>
          <Button variant="secondary">Open dialog</Button>
        </DialogTrigger>
        <DialogContent className={styles.content}>
          <DialogTitle>Confirm action</DialogTitle>
          <DialogDescription>
            This is a dialog rendered from the ui package. Press escape or click outside to
            dismiss.
          </DialogDescription>
          <div className={styles.actions}>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>Confirm</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </DialogRoot>

      <DialogRoot>
        <DialogTrigger>
          <Button variant="secondary">Open dialog (shakes on outside click)</Button>
        </DialogTrigger>
        <DialogContent className={styles.content} shakeOnInteractOutside>
          <DialogTitle>Finish this first</DialogTitle>
          <DialogDescription>
            Clicking the scrim won&apos;t dismiss this — it shakes &ldquo;no.&rdquo; Use a
            button or press escape instead.
          </DialogDescription>
          <div className={styles.actions}>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>Confirm</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </DialogRoot>
    </Section>
  );
}
