import { Combobox } from 'ui/components/combobox';
import { defineDoc } from '../types';

const ITEMS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
  { value: 'angular', label: 'Angular' },
  { value: 'qwik', label: 'Qwik (coming soon)', disabled: true },
  { value: 'preact', label: 'Preact' },
];

export const doc = defineDoc({
  description:
    'A text field that filters a list of options as you type and commits one of them.',
  controls: {
    placeholder: { type: 'text', default: 'Search a framework…' },
    width: { type: 'segmented', options: ['hug', 'fill'], default: 'hug' },
    preselected: { type: 'boolean', label: 'Preselect a value', default: false },
    emptyMessage: { type: 'text', label: 'Empty message', default: 'No results' },
    disabled: { type: 'boolean', default: false },
  },
  /* Uncontrolled so the example stays interactive; the key remounts it when
     the preselection changes. The wrapper gives `fill` a width to fill. */
  render: ({ placeholder, width, preselected, emptyMessage, disabled }) => (
    <div style={{ width: 280 }}>
      <Combobox
        key={String(preselected)}
        items={ITEMS}
        defaultValue={preselected ? 'react' : undefined}
        placeholder={placeholder}
        emptyMessage={emptyMessage}
        width={width}
        disabled={disabled}
      />
    </div>
  ),
});
