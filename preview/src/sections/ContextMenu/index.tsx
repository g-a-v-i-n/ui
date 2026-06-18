import {
  ContextMenuRoot,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from 'ui/components/context-menu';
import { Section } from '../../Section';

export function ContextMenuSection() {
  return (
    <Section title="Context menu">
      <ContextMenuRoot>
        <ContextMenuTrigger>
          <div className="context-target">Right-click here</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Cut</ContextMenuItem>
          <ContextMenuItem suffixSlot={<span>⌘C</span>}>Copy</ContextMenuItem>
          <ContextMenuItem suffixSlot={<span>⌘V</span>}>Paste</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>More</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Duplicate</ContextMenuItem>
              <ContextMenuItem>Rename</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenuRoot>
    </Section>
  );
}
