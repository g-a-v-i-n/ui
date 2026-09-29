import { useState } from 'react';
import { CheckboxRow } from 'ui/components/checkbox-row';
import { defineDoc } from '../types';

/* CheckboxRow is controlled only, so a small stateful wrapper keeps the
   example interactive. Pages export `doc` rather than components, which the
   fast-refresh rule reads as a stray local component; edits to this file just
   reload the page. */
function Example({ label, defaultChecked }: { label: string; defaultChecked: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div style={{ width: 240 }}>
      <CheckboxRow label={label} checked={checked} onCheckedChange={setChecked} />
    </div>
  );
}

export const doc = defineDoc({
  description:
    'A checkbox and its label as one full-width click target, for option lists and settings.',
  controls: {
    label: { type: 'text', default: 'Subscribe to updates' },
    checked: { type: 'boolean', label: 'Initially checked', default: false },
  },
  render: ({ label, checked }) => (
    <Example key={String(checked)} label={label} defaultChecked={checked} />
  ),
});
