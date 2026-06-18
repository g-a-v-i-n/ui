import { useState } from 'react';
import { Text } from 'ui/components/text';
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
import { Section } from '../../Section';

export function SelectSection() {
  const [selectValue, setSelectValue] = useState('apple');

  return (
    <Section title="Select">
      <SelectRoot value={selectValue} onValueChange={setSelectValue}>
        <SelectTrigger aria-label="Fruit">
          <SelectValue placeholder="Pick a fruit…" />
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
      <Text size="sm" color="secondary">
        selected: {selectValue}
      </Text>
    </Section>
  );
}
