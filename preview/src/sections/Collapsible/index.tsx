import { Text } from 'ui/components/text';
import { SFSymbol } from 'ui/components/sf-symbol';
import { Button } from 'ui/components/button';
import {
  CollapsibleRoot,
  CollapsibleTrigger,
  CollapsibleContent,
} from 'ui/components/collapsible';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function CollapsibleSection() {
  return (
    <Section title="Collapsible">
      <CollapsibleRoot className={styles.root}>
        <CollapsibleTrigger>
          <Button variant="secondary" suffixSlot={<SFSymbol symbol="􀆈" size="sm" />}>
            Toggle details
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className={styles.body}>
            <Text size="sm" color="secondary">
              Hidden details revealed with a height animation.
            </Text>
          </div>
        </CollapsibleContent>
      </CollapsibleRoot>
    </Section>
  );
}
