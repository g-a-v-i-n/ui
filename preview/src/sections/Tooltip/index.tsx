import { Button } from 'ui/components/button';
import { Tooltip } from 'ui/components/tooltip';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function TooltipSection() {
  return (
    <Section title="Tooltip">
      <Tooltip content="Plain hint">
        <Button variant="secondary">Hover me</Button>
      </Tooltip>
      <Tooltip content={<><strong>Rich</strong> tooltip with <code>code</code> and a <a href="#">link</a></>}>
        <Button variant="secondary">Rich content</Button>
      </Tooltip>
      <Tooltip content="On the right" side="right">
        <Button variant="secondary">Side right</Button>
      </Tooltip>
      <div className={styles.padded}>
        <Tooltip content="Always visible" open>
          <Button variant="secondary">Static (always open)</Button>
        </Tooltip>
      </div>
    </Section>
  );
}
