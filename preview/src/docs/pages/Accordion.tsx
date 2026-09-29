import {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from 'ui/components/accordion';
import { defineDoc } from '../types';

const items = [
  {
    value: 'item-1',
    title: 'Is it accessible?',
    body: 'Yes. It adheres to the WAI-ARIA disclosure pattern.',
  },
  {
    value: 'item-2',
    title: 'Is it styled?',
    body: 'Yes. It matches the rest of the library out of the box.',
  },
  {
    value: 'item-3',
    title: 'Is it animated?',
    body: 'Yes. It animates open and closed with the shared easing tokens.',
  },
];

export const doc = defineDoc({
  description:
    'A stack of headings that each expand to reveal a section of content, one at a time or several at once.',
  controls: {
    type: { type: 'segmented', options: ['single', 'multiple'], default: 'single' },
    collapsible: { type: 'boolean', label: 'Collapsible (single only)', default: true },
    open: { type: 'boolean', label: 'Open first item', default: true },
    disabled: { type: 'boolean', default: false },
  },
  /* Uncontrolled so the example stays interactive; the key remounts it when
     an initial-state control changes. */
  render: ({ type, collapsible, open, disabled }) => {
    const key = `${type}-${collapsible}-${open}`;
    const children = items.map((item) => (
      <AccordionItem key={item.value} value={item.value}>
        <AccordionTrigger>{item.title}</AccordionTrigger>
        <AccordionContent>{item.body}</AccordionContent>
      </AccordionItem>
    ));
    return (
      <div style={{ width: 360 }}>
        {type === 'multiple' ? (
          <AccordionRoot
            key={key}
            type="multiple"
            defaultValue={open ? ['item-1'] : []}
            disabled={disabled}
          >
            {children}
          </AccordionRoot>
        ) : (
          <AccordionRoot
            key={key}
            type="single"
            collapsible={collapsible}
            defaultValue={open ? 'item-1' : undefined}
            disabled={disabled}
          >
            {children}
          </AccordionRoot>
        )}
      </div>
    );
  },
});
