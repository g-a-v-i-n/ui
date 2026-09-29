import { Slider } from 'ui/components/slider';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description: 'Picks a number, or a range with two thumbs, by dragging along a track.',
  controls: {
    range: { type: 'boolean', label: 'Range (two thumbs)', default: false },
    orientation: { type: 'segmented', options: ['horizontal', 'vertical'], default: 'horizontal' },
    step: { type: 'number', default: 1, min: 1, max: 25, step: 1 },
    inverted: { type: 'boolean', default: false },
    disabled: { type: 'boolean', default: false },
  },
  /* Uncontrolled so the example stays interactive; the key remounts it when
     the thumb count changes. */
  render: ({ range, orientation, step, inverted, disabled }) => (
    <div style={orientation === 'vertical' ? { height: 200 } : { width: 240 }}>
      <Slider
        key={String(range)}
        defaultValue={range ? [20, 80] : [40]}
        max={100}
        step={step}
        orientation={orientation}
        inverted={inverted}
        disabled={disabled}
        thumbLabels={range ? ['Minimum', 'Maximum'] : ['Value']}
      />
    </div>
  ),
});
