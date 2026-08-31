import { Icon, iconNames } from 'ui/components/icon';
import { Text } from 'ui/components/text';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function IconSection() {
  return (
    <Section title="Icon">
      <div className={styles.grid}>
        {iconNames.map((name) => (
          <div key={name} className={styles.cell}>
            <div className={styles.weights}>
              <Icon icon={name} weight="normal" />
              <Icon icon={name} weight="bold" />
            </div>
            <Text as="span" size="sm" color="tertiary" className={styles.label}>
              {name}
            </Text>
          </div>
        ))}
      </div>
    </Section>
  );
}
