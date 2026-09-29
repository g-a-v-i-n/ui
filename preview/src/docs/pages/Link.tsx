import { Link } from 'ui/components/link';
import { Text } from 'ui/components/text';
import { defineDoc } from '../types';

export const doc = defineDoc({
  description:
    'An inline anchor that inherits the size of the surrounding text, adding only color, weight, and a dotted underline.',
  controls: {
    children: { type: 'text', label: 'Label', default: 'the changelog' },
    size: { type: 'segmented', label: 'Text size', options: ['sm', 'md', 'lg'], default: 'md' },
    inSentence: { type: 'boolean', label: 'Inside a sentence', default: true },
    newTab: { type: 'boolean', label: 'Open in new tab', default: false },
  },
  render: ({ children, size, inSentence, newTab }) => {
    const link = (
      <Link href="#" target={newTab ? '_blank' : undefined} rel={newTab ? 'noreferrer' : undefined}>
        {children}
      </Link>
    );
    return (
      <Text size={size} style={{ textAlign: 'center' }}>
        {inSentence ? <>Everything that shipped this week is in {link}.</> : link}
      </Text>
    );
  },
});
