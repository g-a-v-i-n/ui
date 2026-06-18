import { Text } from 'ui/components/text';
import { Button } from 'ui/components/button';
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
} from 'ui/components/popover';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function PopoverSection() {
  return (
    <Section title="Popover">
      <PopoverRoot>
        <PopoverTrigger>
          <Button variant="secondary">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className={styles.content}>
            <Text size="sm" weight="medium">
              Dimensions
            </Text>
            <Text size="sm" color="secondary">
              Popover content matches the menu surface styling.
            </Text>
          </div>
        </PopoverContent>
      </PopoverRoot>
    </Section>
  );
}
