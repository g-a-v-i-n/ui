import { useState } from 'react';
import { Text } from 'ui/components/text';
import { Slider } from 'ui/components/slider';
import { Section } from '../../Section';

export function SliderSection() {
  const [sliderValue, setSliderValue] = useState([40]);

  return (
    <Section title="Slider">
      <div style={{ width: 240 }}>
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
      <div style={{ width: 240 }}>
        <Slider defaultValue={[20, 80]} max={100} step={1} aria-label="Range" />
      </div>
      <div style={{ width: 240 }}>
        <Slider defaultValue={[50]} disabled aria-label="Disabled" />
      </div>
    </Section>
  );
}
