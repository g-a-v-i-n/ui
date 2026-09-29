import { Label } from 'ui/components/label';
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from 'ui/components/select';
import { Slider } from 'ui/components/slider';
import { Switch } from 'ui/components/switch';
import { Text } from 'ui/components/text';
import { TextInput } from 'ui/components/text-input';
import { ToggleGroup, ToggleGroupItem } from 'ui/components/toggle-group';
import type { ControlDef, Controls as ControlsDef } from './types';
import styles from './docs.module.css';

/* prefixIcon → "Prefix icon". An explicit `label` on the control wins. */
const humanize = (key: string) => {
  const spaced = key.replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLowerCase();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
};

/* The panel is 228px wide inside its padding. Estimate a toggle group's width
   (7px per character at the sm text size, 16px item padding, 4px group
   padding) and fall back to a select when the labels can't fit. */
const PANEL_WIDTH = 228;
const fitsSegmented = (options: readonly string[]) =>
  options.reduce((w, option) => w + option.length * 7 + 16, 4) <= PANEL_WIDTH;

type ControlProps = {
  id: string;
  def: ControlDef;
  value: unknown;
  onChange: (value: unknown) => void;
};

function OptionSelect({
  id,
  options,
  value,
  onChange,
}: {
  id: string;
  options: readonly string[];
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  return (
    <SelectRoot value={String(value)} onValueChange={onChange}>
      <SelectTrigger id={id}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}

function Control({ id, def, value, onChange }: ControlProps) {
  switch (def.type) {
    case 'select':
      return <OptionSelect id={id} options={def.options} value={value} onChange={onChange} />;
    case 'segmented':
      if (!fitsSegmented(def.options)) {
        return <OptionSelect id={id} options={def.options} value={value} onChange={onChange} />;
      }
      return (
        <ToggleGroup
          id={id}
          type="single"
          value={String(value)}
          // Radix reports "" when the active item is clicked again; keep the selection.
          onValueChange={(next) => next && onChange(next)}
          aria-label={def.label}
        >
          {def.options.map((option) => (
            <ToggleGroupItem key={option} value={option} className={styles.segmentedItem}>
              {option}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      );
    case 'text':
      return (
        <TextInput
          id={id}
          width="fill"
          value={String(value)}
          placeholder={def.placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      );
    case 'number':
      return (
        <Slider
          id={id}
          value={[Number(value)]}
          min={def.min}
          max={def.max}
          step={def.step}
          thumbLabels={[def.label ?? id]}
          onValueChange={([next]) => onChange(next)}
        />
      );
    case 'boolean':
      return <Switch id={id} checked={Boolean(value)} onCheckedChange={onChange} />;
  }
}

export function Controls({
  controls,
  values,
  onChange,
}: {
  controls: ControlsDef;
  values: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}) {
  return (
    <div className={styles.controls}>
      {Object.entries(controls).map(([key, def]) => {
        const id = `control-${key}`;
        const label = def.label ?? humanize(key);
        const inline = def.type === 'boolean';
        return (
          <div key={key} className={inline ? styles.controlInline : styles.control}>
            <div className={styles.controlLabel}>
              <Label htmlFor={id} size="xs" color="secondary">
                {label}
              </Label>
              {def.type === 'number' && (
                <Text as="span" size="xs" color="tertiary" tabularNumbers>
                  {String(values[key])}
                </Text>
              )}
            </div>
            {/* A grid cell stretches its child, so hug-width triggers and
                inputs fill the panel without overriding their own widths. */}
            <div className={styles.controlField}>
              <Control id={id} def={def} value={values[key]} onChange={(v) => onChange(key, v)} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
