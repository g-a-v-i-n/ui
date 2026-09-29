import { Avatar } from 'ui/components/avatar';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description:
    'A user or entity image with initials as the fallback. The fallback text scales with the size.',
  controls: {
    size: { type: 'segmented', options: ['sm', 'md', 'lg'], default: 'md' },
    fallback: { type: 'text', default: 'GA' },
    image: { type: 'boolean', label: 'Show image', default: true },
  },
  render: ({ size, fallback, image }) => (
    <Avatar
      size={size}
      fallback={fallback}
      src={image ? 'https://i.pravatar.cc/80?img=32' : undefined}
      alt=""
    />
  ),
});
