import { Button } from 'ui/components/button';
import { Icon } from 'ui/components/icon';
import { Text } from 'ui/components/text';
import {
  CollapsibleRoot,
  CollapsibleTrigger,
  CollapsibleContent,
} from 'ui/components/collapsible';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description: 'Shows and hides a block of content behind a trigger, with a height animation.',
  controls: {
    label: { type: 'text', label: 'Trigger label', default: 'Toggle details' },
    open: { type: 'boolean', label: 'Initially open', default: false },
    disabled: { type: 'boolean', default: false },
  },
  /* Uncontrolled so the example stays interactive; the key remounts it when
     the initial state control changes. */
  render: ({ label, open, disabled }) => (
    <CollapsibleRoot key={String(open)} defaultOpen={open} disabled={disabled} style={{ width: 360 }}>
      <CollapsibleTrigger>
        <Button variant="secondary" suffixSlot={<Icon icon="chevron-down" size="md" />}>
          {label}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div style={{ paddingTop: 8 }}>
          <Text size="sm" color="secondary">
            Hidden details revealed with a height animation.
          </Text>
        </div>
      </CollapsibleContent>
    </CollapsibleRoot>
  ),
});
