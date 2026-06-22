import { Icon, iconNames } from 'ui/components/icon';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function IconSection() {
  return (
    <Section title="Icon">
      <div className={styles.grid}>
        {iconNames.map((name) => (
          <div key={name} className={styles.cell}>
            <Icon icon={name} />
            <span className={styles.label}>{name}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
