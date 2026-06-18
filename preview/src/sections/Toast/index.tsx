import { useState } from 'react';
import { Button } from 'ui/components/button';
import {
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
} from 'ui/components/toast';
import { Section } from '../../Section';

export function ToastSection() {
  const [toastOpen, setToastOpen] = useState(false);

  return (
    <Section title="Toast">
      <Button variant="secondary" onClick={() => setToastOpen(true)}>
        Show toast
      </Button>
      <ToastRoot open={toastOpen} onOpenChange={setToastOpen} duration={4000}>
        <ToastTitle>File saved</ToastTitle>
        <ToastDescription>Your changes have been saved.</ToastDescription>
        <ToastAction altText="Undo save" asChild>
          <button onClick={() => setToastOpen(false)}>Undo</button>
        </ToastAction>
        <ToastClose />
      </ToastRoot>
    </Section>
  );
}
