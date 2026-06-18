import { Carousel } from 'ui/components/carousel';
import { Text } from 'ui/components/text';
import { Section } from '../../Section';
import styles from './styles.module.css';

const slides = [
  { label: 'Slide 1', bg: 'var(--blue-9)' },
  { label: 'Slide 2', bg: 'var(--lime-9)' },
  { label: 'Slide 3', bg: 'var(--amber-9)' },
  { label: 'Slide 4', bg: 'var(--tomato-9)' },
];

export function CarouselSection() {
  return (
    <Section title="Carousel">
      <div className={styles.wrap}>
        <Carousel infinite dots>
          {slides.map((s) => (
            <div key={s.label} className={styles.slide} style={{ background: s.bg }}>
              <Text size="xl" weight="semibold" color="inherit">
                {s.label}
              </Text>
            </div>
          ))}
        </Carousel>
      </div>
    </Section>
  );
}
