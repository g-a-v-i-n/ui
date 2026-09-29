import { Spinner } from 'ui/components/spinner';
import { Button } from 'ui/components/button';
import { Section } from '../../Section';

export function SpinnerSection() {
  return (
    <Section title="Spinner">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner />
      <Spinner size="lg" />
      <Spinner size="xl" />
      <span style={{ color: 'var(--blue-9)', display: 'inline-flex' }}>
        <Spinner />
      </span>
      <Button disabled prefixSlot={<Spinner size="sm" />}>
        Saving…
      </Button>
      <Button round variant="secondary" disabled prefixSlot={<Spinner size="md" />}>
        Loading
      </Button>
    </Section>
  );
}
