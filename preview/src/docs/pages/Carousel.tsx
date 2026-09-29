import { Carousel } from 'ui/components/carousel';
import { Text } from 'ui/components/text';
import { defineDoc } from '../types';

const colors = ['var(--blue-9)', 'var(--lime-9)', 'var(--amber-9)', 'var(--tomato-9)'];

export const doc = defineDoc({
  description:
    'Shows one slide at a time. Swipe, click the arrows or dots, or press the arrow keys to move between slides.',
  controls: {
    slides: { type: 'number', default: 4, min: 1, max: 6, step: 1 },
    arrows: { type: 'boolean', default: true },
    dots: { type: 'boolean', default: false },
    infinite: { type: 'boolean', default: false },
  },
  /* The slide count and looping change the internal index, so the key
     remounts the carousel when either does. */
  render: ({ slides, arrows, dots, infinite }) => (
    <div style={{ width: 360 }}>
      <Carousel key={`${slides}-${infinite}`} arrows={arrows} dots={dots} infinite={infinite}>
        {Array.from({ length: slides }, (_, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 200,
              color: '#fff',
              background: colors[i % colors.length],
            }}
          >
            <Text size="xl" weight="semibold" color="inherit">
              Slide {i + 1}
            </Text>
          </div>
        ))}
      </Carousel>
    </div>
  ),
});
