import {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from 'ui/components/accordion';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function AccordionSection() {
  return (
    <Section title="Accordion">
      <div className={styles.wrap}>
        <AccordionRoot type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA disclosure pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It matches the rest of the library out of the box.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It animates open and closed with the shared easing tokens.
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </div>
    </Section>
  );
}
