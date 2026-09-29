import { Fragment } from 'react';
import { MiddleDot } from 'ui/components/middle-dot';
import { Text } from 'ui/components/text';
import { defineDoc } from '../types';

const items = ['12 min read', 'Updated today', 'Public', 'English', '4 comments'];

export const doc = defineDoc({
  description: 'A small dot that separates short inline facts, like the metadata under a title.',
  controls: {
    count: { type: 'number', label: 'Items', min: 2, max: 5, step: 1, default: 3 },
    size: { type: 'segmented', label: 'Text size', options: ['sm', 'md', 'lg'], default: 'sm' },
  },
  render: ({ count, size }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {items.slice(0, count).map((item, i) => (
        <Fragment key={item}>
          {i > 0 && <MiddleDot />}
          <Text size={size} color="secondary">
            {item}
          </Text>
        </Fragment>
      ))}
    </div>
  ),
});
