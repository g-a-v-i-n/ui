import { Text } from 'ui/components/text';
import { AspectRatio } from 'ui/components/aspect-ratio';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function AspectRatioSection() {
  return (
    <Section title="AspectRatio">
      <div className={styles.frame}>
        <AspectRatio ratio={16 / 9}>
          <div className={styles.box}>
            <Text size="sm" color="secondary">
              16 : 9
            </Text>
          </div>
        </AspectRatio>
      </div>
    </Section>
  );
}
