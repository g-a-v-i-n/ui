import { useState } from 'react';
import { Button } from 'ui/components/button';
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from 'ui/components/dialog';
import { Text } from 'ui/components/text';
import { Section } from '../../Section';
import styles from './styles.module.css';

/* Content that changes size while open: the surface tweens to follow it. */
function ResizingDialog() {
  const [expanded, setExpanded] = useState(false);
  return (
    <DialogRoot onOpenChange={(open) => !open && setExpanded(false)}>
      <DialogTrigger>
        <Button variant="secondary">Open resizing dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Export project</DialogTitle>
        <DialogDescription>
          {expanded
            ? 'Everything in the workspace is bundled into one archive: sources, assets, and the full history. Large projects can take a minute.'
            : 'The workspace is bundled into a single archive.'}
        </DialogDescription>
        {expanded && (
          <div className={styles.options}>
            <Text as="p" size="sm">Include hidden files</Text>
            <Text as="p" size="sm">Compress images</Text>
            <Text as="p" size="sm">Strip metadata</Text>
          </div>
        )}
        <div className={styles.actions}>
          <Button variant="secondary" onClick={() => setExpanded((value) => !value)}>
            {expanded ? 'Fewer options' : 'More options'}
          </Button>
          <DialogClose asChild>
            <Button>Export</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </DialogRoot>
  );
}

export function DialogSection() {
  return (
    <Section title="Dialog">
      <DialogRoot>
        <DialogTrigger>
          <Button variant="secondary">Open dialog</Button>
        </DialogTrigger>
        <DialogContent>
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
      <ResizingDialog />
    </Section>
  );
}
