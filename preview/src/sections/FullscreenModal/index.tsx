import { Text } from 'ui/components/text';
import { Button } from 'ui/components/button';
import { FullscreenModal } from 'ui/components/fullscreen-modal';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function FullscreenModalSection() {
  return (
    <Section title="FullscreenModal">
      <FullscreenModal
        title="Fullscreen example"
        description="A fullscreen takeover with a close button in the top left."
        trigger={<Button variant="secondary">Open fullscreen</Button>}
        triggerTooltip="Takes over the whole viewport"
      >
        <div className={styles.content}>
          <Text size="lg" weight="medium">
            Fullscreen content
          </Text>
          <Text size="sm" color="secondary">
            Press escape or the ✕ button to close.
          </Text>
        </div>
      </FullscreenModal>
    </Section>
  );
}
