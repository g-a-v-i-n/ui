import { Text } from 'ui/components/text';
import { AspectRatio as AspectRatioPrimitive } from 'ui/primitives';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function AspectRatioSection() {
  return (
    <Section title="AspectRatio">
      <div className={styles.frame}>
        <AspectRatioPrimitive.Root ratio={16 / 9}>
          <div className={styles.box}>
            <Text size="sm" color="secondary">
              16 : 9
            </Text>
          </div>
        </AspectRatioPrimitive.Root>
      </div>
    </Section>
  );
}
