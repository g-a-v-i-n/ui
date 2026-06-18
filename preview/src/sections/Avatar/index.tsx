import { Avatar, AvatarRoot, AvatarImage, AvatarFallback } from 'ui/components/avatar';
import { Section } from '../../Section';

export function AvatarSection() {
  return (
    <Section title="Avatar">
      <Avatar
        size="sm"
        src="https://i.pravatar.cc/80?img=12"
        alt="Avatar"
        fallback="GA"
      />
      <Avatar
        size="md"
        src="https://i.pravatar.cc/80?img=32"
        alt="Avatar"
        fallback="GA"
      />
      <Avatar size="lg" fallback="GA" />
      <AvatarRoot size="lg">
        <AvatarImage src="https://i.pravatar.cc/80?img=5" alt="Avatar" />
        <AvatarFallback>AB</AvatarFallback>
      </AvatarRoot>
    </Section>
  );
}
