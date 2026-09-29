import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectGroup,
} from 'ui/components/select';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description: 'Picks one value from a list, in a popover anchored to the trigger.',
  controls: {
    placeholder: { type: 'text', default: 'Pick a fruit…' },
    preselected: { type: 'boolean', label: 'Preselect a value', default: false },
    disabled: { type: 'boolean', default: false },
  },
  render: ({ placeholder, preselected, disabled }) => (
    <SelectRoot
      key={String(preselected)}
      defaultValue={preselected ? 'apple' : undefined}
      disabled={disabled}
    >
      <SelectTrigger aria-label="Fruit">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="cherry">Cherry</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="leek" disabled>
            Leek (out of stock)
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </SelectRoot>
  ),
});
