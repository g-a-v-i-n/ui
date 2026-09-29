import { Button } from 'ui/components/button';
import { Card } from 'ui/components/card';
import { Text } from 'ui/components/text';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description:
    'A surface that groups related content: raised with a shadow on the page, or flat when nested in another surface.',
  controls: {
    variant: { type: 'segmented', options: ['primary', 'secondary'], default: 'primary' },
    title: { type: 'text', default: 'Project settings' },
    body: { type: 'text', default: 'Manage the name, visibility, and collaborators of this project.' },
    footer: { type: 'boolean', label: 'With footer', default: false },
  },
  render: ({ variant, title, body, footer }) => (
    <Card variant={variant} style={{ width: 280, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Text size="sm" weight="medium">
        {title}
      </Text>
      <Text size="sm" color="secondary">
        {body}
      </Text>
      {footer && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, paddingTop: 12 }}>
          <Button variant="secondary" size="md">
            Cancel
          </Button>
          <Button size="md">Save</Button>
        </div>
      )}
    </Card>
  ),
});
