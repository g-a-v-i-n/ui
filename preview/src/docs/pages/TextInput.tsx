import { Icon } from 'ui/components/icon';
import { Tag } from 'ui/components/tag';
import { TextInput } from 'ui/components/text-input';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description:
    'A single-line text field with optional prefix and suffix slots. Hugs its text, fills its container, or takes a fixed width.',
  controls: {
    placeholder: { type: 'text', default: 'Search…' },
    variant: { type: 'segmented', options: ['default', 'toolbar'], default: 'default' },
    width: { type: 'segmented', options: ['hug', 'fill', '200px'], default: 'hug' },
    prefixIcon: { type: 'boolean', label: 'Prefix icon', default: false },
    suffixTag: { type: 'boolean', label: 'Suffix tag', default: false },
    disabled: { type: 'boolean', default: false },
  },
  render: ({ placeholder, variant, width, prefixIcon, suffixTag, disabled }) => (
    <div style={{ width: 320, display: 'flex', justifyContent: 'center' }}>
      <TextInput
        placeholder={placeholder}
        variant={variant}
        width={width === '200px' ? 200 : width}
        disabled={disabled}
        aria-label="Search"
        prefixSlot={prefixIcon ? <Icon icon="magnifying-glass" size="lg" /> : undefined}
        suffixSlot={suffixTag ? <Tag mono>⌘K</Tag> : undefined}
      />
    </div>
  ),
});
