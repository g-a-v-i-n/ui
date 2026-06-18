import { Text } from 'ui/components/text';
import { Button } from 'ui/components/button';
import { Avatar } from 'ui/components/avatar';
import {
  HoverCardRoot,
  HoverCardTrigger,
  HoverCardContent,
} from 'ui/components/hover-card';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function HoverCardSection() {
  return (
    <Section title="HoverCard">
      <HoverCardRoot>
        <HoverCardTrigger>
          <Button variant="secondary">Hover for card</Button>
        </HoverCardTrigger>
        <HoverCardContent width="md">
          <div className={styles.row}>
            <Avatar size="lg" fallback="UI" />
            <div className={styles.info}>
              <Text size="sm" weight="medium">
                ui library
              </Text>
              <Text size="xs" color="secondary">
                Radix primitives, styled.
              </Text>
            </div>
          </div>
        </HoverCardContent>
      </HoverCardRoot>
    </Section>
  );
}
