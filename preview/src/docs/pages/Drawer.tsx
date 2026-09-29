import { Button } from 'ui/components/button';
import {
  DrawerRoot,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from 'ui/components/drawer';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description:
    'A panel that slides in from a viewport edge, for secondary content that should not leave the page.',
  controls: {
    title: { type: 'text', default: 'Notifications' },
    side: { type: 'segmented', options: ['left', 'right', 'top', 'bottom'], default: 'right' },
    scrim: { type: 'boolean', default: true },
    elevated: { type: 'boolean', default: false },
    defaultOpen: { type: 'boolean', label: 'Initially open', default: false },
  },
  /* Uncontrolled so the example stays interactive; the key remounts it when
     the initial state control changes. */
  render: ({ title, side, scrim, elevated, defaultOpen }) => (
    <DrawerRoot key={String(defaultOpen)} defaultOpen={defaultOpen}>
      <DrawerTrigger>
        <Button variant="secondary">Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent side={side} scrim={scrim} elevated={elevated}>
        <DrawerTitle>{title}</DrawerTitle>
        <DrawerDescription>
          A slide-in panel anchored to the {side} edge. Press escape or click outside to dismiss.
        </DrawerDescription>
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
          <DrawerClose asChild>
            <Button variant="secondary">Close</Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </DrawerRoot>
  ),
});
