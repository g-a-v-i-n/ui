import { useState } from 'react';
import { SFSymbol } from 'ui/components/sf-symbol';
import { Icon } from 'ui/components/icon';
import { Tag } from 'ui/components/tag';
import { DropdownMenuItem } from 'ui/components/dropdown-menu';
import {
  ToolbarRoot,
  ToolbarButton,
  ToolbarLink,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
  ToolbarSplitButton,
  ToolbarInput,
  ToolbarGroup,
} from 'ui/components/toolbar';
import { Section } from '../../Section';

export function ToolbarSection() {
  const [inputToolbar, setInputToolbar] = useState('Untitled');
  const [toolbarMarks, setToolbarMarks] = useState<string[]>(['bold']);
  const [toolbarFavorite, setToolbarFavorite] = useState(false);

  return (
    <Section title="Toolbar">
      <ToolbarRoot aria-label="Formatting options">
        <ToolbarInput
          value={inputToolbar}
          onChange={(e) => setInputToolbar(e.target.value)}
          placeholder="Untitled"
          aria-label="Document title"
          prefixSlot={<SFSymbol symbol="􀈎" size="sm" />}
          suffixSlot={<Tag mono>⌘1</Tag>}
        />
        <ToolbarSeparator />
        <ToolbarToggleGroup
          type="multiple"
          value={toolbarMarks}
          onValueChange={setToolbarMarks}
          aria-label="Text formatting"
        >
          <ToolbarToggleItem value="bold">Bold</ToolbarToggleItem>
          <ToolbarToggleItem value="italic">Italic</ToolbarToggleItem>
          <ToolbarToggleItem value="strike">Strike</ToolbarToggleItem>
        </ToolbarToggleGroup>
        <ToolbarSeparator />
        <ToolbarToggleGroup
          type="single"
          value={toolbarFavorite ? 'fav' : ''}
          onValueChange={(v) => setToolbarFavorite(v === 'fav')}
          aria-label="Favorite"
        >
          <ToolbarToggleItem
            value="fav"
            aria-label="Toggle favorite"
            tooltip={toolbarFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Icon icon={toolbarFavorite ? 'star-fill' : 'star'} size="md" />
          </ToolbarToggleItem>
        </ToolbarToggleGroup>
        <ToolbarSeparator />
        <ToolbarGroup>
        <ToolbarButton width="square" aria-label="Search">
          <Icon icon="magnifying-glass" size="md" />
        </ToolbarButton>
        <ToolbarButton>Share</ToolbarButton>
        <ToolbarSplitButton
          tooltip="Run"
          prefixSlot={<Icon icon="play-fill" size="md" />}
          onClick={() => console.log('run')}
          dropdownContent={
            <>
              <DropdownMenuItem>Run all</DropdownMenuItem>
              <DropdownMenuItem>Run selection</DropdownMenuItem>
              <DropdownMenuItem suffixSlot={<span>⌘R</span>}>Run again</DropdownMenuItem>
            </>
          }
        >
          Run
        </ToolbarSplitButton>
        <ToolbarSplitButton
          square
          tooltip="Run"
          aria-label="Run"
          prefixSlot={<Icon icon="play-fill" size="md" />}
          onClick={() => console.log('run')}
          dropdownContent={
            <>
              <DropdownMenuItem>Run all</DropdownMenuItem>
              <DropdownMenuItem>Run selection</DropdownMenuItem>
              <DropdownMenuItem suffixSlot={<span>⌘R</span>}>Run again</DropdownMenuItem>
            </>
          }
        />
        </ToolbarGroup>
        <ToolbarLink href="#" target="_blank">
          Edited 2h ago
        </ToolbarLink>
      </ToolbarRoot>
    </Section>
  );
}
