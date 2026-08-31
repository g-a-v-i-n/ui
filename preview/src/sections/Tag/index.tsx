import { Tag } from 'ui/components/tag';
import { Section } from '../../Section';

export function TagSection() {
  return (
    <Section title="Tag">
      <Tag>Default</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="warning">Warning</Tag>
      <Tag variant="error">Error</Tag>
      <Tag variant="blue">Blue</Tag>
      <Tag>123</Tag>
      <Tag round>Pill</Tag>
      <Tag round variant="success">Pill success</Tag>
      <Tag round>9+</Tag>
      <Tag mono>v0.0.1</Tag>
      <Tag mono round>2.1.0-beta.3</Tag>
      <Tag mono variant="success">build #4821</Tag>
      <Tag secondary>Default</Tag>
      <Tag secondary variant="success">Success</Tag>
      <Tag secondary variant="warning">Warning</Tag>
      <Tag secondary variant="error">Error</Tag>
      <Tag secondary variant="blue">Blue</Tag>
      <Tag secondary round variant="error">Pill error</Tag>
      <Tag outline>Default</Tag>
      <Tag outline variant="success">Success</Tag>
      <Tag outline variant="warning">Warning</Tag>
      <Tag outline variant="error">Error</Tag>
      <Tag outline variant="blue">Blue</Tag>
      <Tag outline round>Pill</Tag>
      <Tag outline mono>v0.0.1</Tag>
    </Section>
  );
}
