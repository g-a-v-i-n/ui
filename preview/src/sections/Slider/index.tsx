import { useState } from 'react';
import { Text } from 'ui/components/text';
import { Slider } from 'ui/components/slider';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function SliderSection() {
  const [sliderValue, setSliderValue] = useState([40]);

  return (
    <Section title="Slider">
      <div className={styles.track}>
        <Slider
          value={sliderValue}
          onValueChange={setSliderValue}
          max={100}
          step={1}
          aria-label="Volume"
        />
      </div>
      <Text size="sm" color="secondary" tabularNumbers>
        {sliderValue[0]}
      </Text>
      <div className={styles.track}>
        <Slider defaultValue={[20, 80]} max={100} step={1} aria-label="Range" />
      </div>
      <div className={styles.track}>
        <Slider defaultValue={[50]} disabled aria-label="Disabled" />
      </div>
    </Section>
  );
}
