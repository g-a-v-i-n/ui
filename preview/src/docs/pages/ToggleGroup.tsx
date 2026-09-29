import { useState } from 'react';
import { Icon, type IconName } from 'ui/components/icon';
import { ToggleGroup, ToggleGroupItem } from 'ui/components/toggle-group';
import { defineDoc, type Controls, type ControlValues } from '../types';

const SHAPES: { value: string; label: string; icon: IconName }[] = [
  { value: 'circle', label: 'Circle', icon: 'circle' },
  { value: 'rectangle', label: 'Rectangle', icon: 'rectangle' },
  { value: 'hexagon', label: 'Hexagon', icon: 'hexagon' },
];

const controls = {
  initial: {
    type: 'select',
    label: 'Initial value',
    options: ['circle', 'rectangle', 'hexagon'],
    default: 'circle',
  },
  round: { type: 'boolean', default: false },
  icons: { type: 'boolean', label: 'With icons', default: false },
  iconOnly: { type: 'boolean', label: 'Icon only', default: false },
  allowEmpty: { type: 'boolean', label: 'Allow deselecting', default: false },
  disabled: { type: 'boolean', default: false },
} as const satisfies Controls;

/* Controlled so the example can refuse an empty value; Radix reports '' when
   the pressed item is clicked again. */
function Example({ initial, round, icons, iconOnly, allowEmpty, disabled }: ControlValues<typeof controls>) {
  const [value, setValue] = useState<string>(initial);
  return (
    <ToggleGroup
      type="single"
      round={round}
      disabled={disabled}
      value={value}
      onValueChange={(next) => {
        if (next || allowEmpty) setValue(next);
      }}
    >
      {SHAPES.map((shape) => (
        <ToggleGroupItem
          key={shape.value}
          value={shape.value}
          aria-label={iconOnly ? shape.label : undefined}
        >
          {(icons || iconOnly) && <Icon icon={shape.icon} size="md" />}
          {iconOnly ? null : shape.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export const doc = defineDoc({
  description:
    'A set of toggles where one is active at a time; the highlight glides between items on change.',
  controls,
  /* The key remounts the example when the initial value control changes. */
  render: (values) => <Example key={values.initial} {...values} />,
});
