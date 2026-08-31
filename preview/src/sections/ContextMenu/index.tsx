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
import { Text } from 'ui/components/text';
import { Section } from '../../Section';

export function ContextMenuSection() {
  return (
    <Section title="Context menu">
      <ContextMenuRoot>
        <ContextMenuTrigger>
          <Text as="div" size="sm" color="secondary">
            Right-click here
          </Text>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Cut</ContextMenuItem>
          <ContextMenuItem suffixSlot="⌘C">Copy</ContextMenuItem>
          <ContextMenuItem suffixSlot="⌘V">Paste</ContextMenuItem>
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
