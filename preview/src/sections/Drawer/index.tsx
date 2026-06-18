import { Button } from 'ui/components/button';
import {
  DrawerRoot,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from 'ui/components/drawer';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function DrawerSection() {
  return (
    <Section title="Drawer">
      {(['left', 'right', 'top', 'bottom'] as const).map((side) => (
        <DrawerRoot key={side}>
          <DrawerTrigger>
            <Button variant="secondary">Open {side}</Button>
          </DrawerTrigger>
          <DrawerContent side={side}>
            <DrawerTitle>{side} drawer</DrawerTitle>
            <DrawerDescription>
              A slide-in panel anchored to the {side} edge. Press escape or
              click the overlay to dismiss.
            </DrawerDescription>
            <div className={styles.footer}>
              <DrawerClose asChild>
                <Button variant="secondary">Close</Button>
              </DrawerClose>
            </div>
          </DrawerContent>
        </DrawerRoot>
      ))}
    </Section>
  );
}
