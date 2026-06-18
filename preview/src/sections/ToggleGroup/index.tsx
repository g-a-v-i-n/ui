import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from 'ui/components/toggle-group';
import { SFSymbol } from 'ui/components/sf-symbol';
import { Section } from '../../Section';

export function ToggleGroupSection() {
  const [toggleAlign, setToggleAlign] = useState('left');
  const [toggleView, setToggleView] = useState('grid');

  return (
    <Section title="ToggleGroup">
      <ToggleGroup
        type="single"
        value={toggleAlign}
        onValueChange={(v) => v && setToggleAlign(v)}
      >
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup
        type="single"
        value={toggleView}
        onValueChange={(v) => v && setToggleView(v)}
      >
        <ToggleGroupItem value="grid">
          <SFSymbol symbol="􀏅" size="sm" />
          Grid
        </ToggleGroupItem>
        <ToggleGroupItem value="list">
          <SFSymbol symbol="􀋲" size="sm" />
          List
        </ToggleGroupItem>
      </ToggleGroup>
    </Section>
  );
}
