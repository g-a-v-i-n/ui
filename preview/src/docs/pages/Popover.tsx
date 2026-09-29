import { Button } from 'ui/components/button';
import { PopoverRoot, PopoverTrigger, PopoverContent, PopoverClose } from 'ui/components/popover';
import { Text } from 'ui/components/text';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description:
    'Rich content anchored to a trigger, on the menu surface. Non-modal by default, so the page stays usable behind it.',
  controls: {
    side: { type: 'segmented', options: ['top', 'right', 'bottom', 'left'], default: 'bottom' },
    align: { type: 'segmented', options: ['start', 'center', 'end'], default: 'center' },
    sideOffset: { type: 'number', label: 'Side offset', default: 3, min: 0, max: 24, step: 1 },
    modal: { type: 'boolean', default: false },
    defaultOpen: { type: 'boolean', label: 'Initially open', default: false },
  },
  /* Uncontrolled so the example stays interactive; the key remounts it when
     the initial state control changes. */
  render: ({ side, align, sideOffset, modal, defaultOpen }) => (
    <PopoverRoot key={String(defaultOpen)} defaultOpen={defaultOpen} modal={modal}>
      <PopoverTrigger>
        <Button variant="secondary">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent side={side} align={align} sideOffset={sideOffset}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 200 }}>
          <Text size="sm" weight="medium">
            Dimensions
          </Text>
          <Text size="sm" color="secondary">
            Popover content matches the menu surface styling.
          </Text>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <PopoverClose asChild>
              <Button variant="secondary" size="sm">
                Done
              </Button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </PopoverRoot>
  ),
});
