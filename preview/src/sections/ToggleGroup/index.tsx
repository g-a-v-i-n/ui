import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from 'ui/components/toggle-group';
import { Icon } from 'ui/components/icon';
import { Section } from '../../Section';

export function ToggleGroupSection() {
  const [toggleAlign, setToggleAlign] = useState('left');
  const [toggleView, setToggleView] = useState('grid');
  const [toggleTheme, setToggleTheme] = useState('light');
  const [toggleShape, setToggleShape] = useState('circle');
  const [toggleLock, setToggleLock] = useState('unlocked');

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
          <Icon icon="grid-square" size="md" />
          Grid
        </ToggleGroupItem>
        <ToggleGroupItem value="list">
          <Icon icon="list" size="md" />
          List
        </ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup
        type="single"
        round
        value={toggleTheme}
        onValueChange={(v) => v && setToggleTheme(v)}
      >
        <ToggleGroupItem value="light">
          <Icon icon="sun" size="md" />
          Light
        </ToggleGroupItem>
        <ToggleGroupItem value="dark">
          <Icon icon="moon" size="md" />
          Dark
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Icon-only — each item needs an accessible label. */}
      <ToggleGroup
        type="single"
        value={toggleShape}
        onValueChange={(v) => v && setToggleShape(v)}
      >
        <ToggleGroupItem value="circle" aria-label="Circle">
          <Icon icon="circle" size="md" />
        </ToggleGroupItem>
        <ToggleGroupItem value="rectangle" aria-label="Rectangle">
          <Icon icon="rectangle" size="md" />
        </ToggleGroupItem>
        <ToggleGroupItem value="hexagon" aria-label="Hexagon">
          <Icon icon="hexagon" size="md" />
        </ToggleGroupItem>
      </ToggleGroup>

      {/* The icon reflects state — filled lock when locked. */}
      <ToggleGroup
        type="single"
        value={toggleLock}
        onValueChange={(v) => v && setToggleLock(v)}
      >
        <ToggleGroupItem value="unlocked">
          <Icon icon="lock-unlocked" size="md" />
          Unlocked
        </ToggleGroupItem>
        <ToggleGroupItem value="locked">
          <Icon icon="lock-locked-fill" size="md" />
          Locked
        </ToggleGroupItem>
      </ToggleGroup>
    </Section>
  );
}
