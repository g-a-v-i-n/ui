import { Avatar } from 'ui/components/avatar';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description:
    'A user or entity image with initials as the fallback. Sizes follow the control height scale, so an avatar lines up with a button of the same size, and the fallback text scales with it.',
  controls: {
    size: { type: 'segmented', options: ['xs', 'sm', 'md', 'lg', 'xl'], default: 'md' },
    fallback: { type: 'text', default: 'GA' },
    image: { type: 'boolean', label: 'Show image', default: true },
  },
  render: ({ size, fallback, image }) => (
    <Avatar
      size={size}
      fallback={fallback}
      src={image ? 'https://i.pravatar.cc/112?img=32' : undefined}
      alt=""
    />
  ),
});
