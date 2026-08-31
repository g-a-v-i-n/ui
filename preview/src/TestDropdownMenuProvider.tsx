import { useState, type ReactNode } from 'react';
import {
  DropdownMenuRoot,
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

/**
 * The test dropdown menu, hoisted to a page-level provider: one shared
 * DropdownMenuRoot whose content is the standard test menu, so a
 * DropdownMenuTrigger anywhere under it opens the same menu.
 */
export function TestDropdownMenuProvider({ children }: { children: ReactNode }) {
  const [showToolbar, setShowToolbar] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [radio, setRadio] = useState('medium');

  return (
    <DropdownMenuRoot>
      {children}
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
            <DropdownMenuItem suffixSlot="⌘C">JSON</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem suffixSlot="⌘,">Settings…</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
}
