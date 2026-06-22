import { useState } from 'react';
import { Icon } from 'ui/components/icon';
import { Button } from 'ui/components/button';
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from 'ui/components/dropdown-menu';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function DropdownMenuSection() {
  const [showToolbar, setShowToolbar] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [radio, setRadio] = useState('medium');

  return (
    <Section title="Dropdown menu">
      <DropdownMenuRoot>
        <DropdownMenuTrigger>
          <Button variant="secondary" suffixSlot={<Icon icon="chevron-down" size="md" className={styles.chevron} />}>
            Open dropdown
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent width="md">
          <DropdownMenuLabel>View</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuCheckboxItem
              checked={showToolbar}
              onCheckedChange={(v) => setShowToolbar(Boolean(v))}
            >
              Show toolbar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showSidebar}
              onCheckedChange={(v) => setShowSidebar(Boolean(v))}
            >
              Show sidebar
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Density</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={radio} onValueChange={setRadio}>
            <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="medium">Medium</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Copy as</DropdownMenuSubTrigger>
            <DropdownMenuSubContent width="sm">
              <DropdownMenuItem>PNG</DropdownMenuItem>
              <DropdownMenuItem>SVG</DropdownMenuItem>
              <DropdownMenuItem suffixSlot={<span>⌘C</span>}>JSON</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem suffixSlot={<span>⌘,</span>}>Settings…</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuRoot>
    </Section>
  );
}
