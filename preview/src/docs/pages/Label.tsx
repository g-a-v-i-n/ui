import { Label } from 'ui/components/label';
import { Switch } from 'ui/components/switch';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description:
    'Names a form control. Clicking it focuses or toggles the control it points at via htmlFor.',
  controls: {
    children: { type: 'text', label: 'Text', default: 'Email notifications' },
    size: { type: 'segmented', options: ['xs', 'sm', 'md'], default: 'sm' },
    weight: { type: 'segmented', options: ['regular', 'medium', 'semibold'], default: 'medium' },
    color: { type: 'segmented', options: ['primary', 'secondary', 'tertiary'], default: 'primary' },
    withControl: { type: 'boolean', label: 'With a switch', default: true },
  },
  render: ({ children, size, weight, color, withControl }) => (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
      <Label htmlFor={withControl ? 'label-doc' : undefined} size={size} weight={weight} color={color}>
        {children}
      </Label>
      {withControl && <Switch id="label-doc" defaultChecked />}
    </div>
  ),
});
