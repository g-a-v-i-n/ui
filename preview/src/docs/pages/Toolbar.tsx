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
  ToolbarGroup,
  ToolbarInput,
  ToolbarSplitButton,
} from 'ui/components/toolbar';
import { defineDoc } from '../types';

const MARKS = [
  { value: 'bold', label: 'Bold' },
  { value: 'italic', label: 'Italic' },
  { value: 'strike', label: 'Strike' },
];

const runMenu = (
  <>
    <DropdownMenuItem>Run all</DropdownMenuItem>
    <DropdownMenuItem>Run selection</DropdownMenuItem>
    <DropdownMenuItem suffixSlot="⌘R">Run again</DropdownMenuItem>
  </>
);

export const doc = defineDoc({
  description:
    'A row of related controls — buttons, toggles, an input, a split button — with one tab stop and arrow-key navigation.',
  propsFor: [
    'ToolbarRoot',
    'ToolbarButton',
    'ToolbarToggleGroup',
    'ToolbarToggleItem',
    'ToolbarSplitButton',
    'ToolbarInput',
    'ToolbarLink',
    'ToolbarSeparator',
    'ToolbarGroup',
  ],
  controls: {
    input: { type: 'boolean', label: 'Title input', default: true },
    toggleType: {
      type: 'segmented',
      label: 'Toggle type',
      options: ['single', 'multiple'],
      default: 'multiple',
    },
    tooltips: { type: 'boolean', default: true },
    iconButton: { type: 'boolean', label: 'Square icon button', default: true },
    splitButton: { type: 'boolean', label: 'Split button', default: true },
    link: { type: 'boolean', label: 'Trailing link', default: false },
  },
  render: ({ input, toggleType, tooltips, iconButton, splitButton, link }) => {
    const marks = MARKS.map(({ value, label }) => (
      <ToolbarToggleItem key={value} value={value} tooltip={tooltips ? label : undefined}>
        {label}
      </ToolbarToggleItem>
    ));
    return (
      <ToolbarRoot aria-label="Formatting options">
        {input && (
          <>
            <ToolbarInput
              defaultValue="Untitled"
              placeholder="Untitled"
              aria-label="Document title"
              prefixSlot={<Icon icon="document" size="xl" />}
              suffixSlot={<Tag mono>⌘1</Tag>}
            />
            <ToolbarSeparator />
          </>
        )}
        {/* Uncontrolled; the keys remount the group when its type changes. */}
        {toggleType === 'multiple' ? (
          <ToolbarToggleGroup
            key="multiple"
            type="multiple"
            defaultValue={['bold']}
            aria-label="Text formatting"
          >
            {marks}
          </ToolbarToggleGroup>
        ) : (
          <ToolbarToggleGroup key="single" type="single" defaultValue="bold" aria-label="Text formatting">
            {marks}
          </ToolbarToggleGroup>
        )}
        <ToolbarSeparator />
        <ToolbarGroup>
          {iconButton && (
            <ToolbarButton width="square" aria-label="Search">
              <Icon icon="magnifying-glass" size="xl" />
            </ToolbarButton>
          )}
          <ToolbarButton>Share</ToolbarButton>
          {splitButton && (
            <ToolbarSplitButton
              tooltip={tooltips ? 'Run' : undefined}
              prefixSlot={<Icon icon="play-fill" size="xl" />}
              dropdownContent={runMenu}
            >
              Run
            </ToolbarSplitButton>
          )}
        </ToolbarGroup>
        {link && <ToolbarLink href="#">Edited 2h ago</ToolbarLink>}
      </ToolbarRoot>
    );
  },
});
