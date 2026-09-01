import { Icon } from 'ui/components/icon';
import { Button } from 'ui/components/button';
import { DropdownMenuTrigger } from 'ui/components/dropdown-menu';
import { Section } from '../../Section';

// The menu itself lives in TestDropdownMenuProvider, which wraps the whole
// page — this section only renders a trigger for it.
export function DropdownMenuSection() {
  return (
    <Section title="Dropdown menu">
      <DropdownMenuTrigger>
        <Button variant="secondary" suffixSlot={<Icon icon="chevron-down" size="md" style={{ transform: 'translateY(1px)' }} />}>
          Open dropdown
        </Button>
      </DropdownMenuTrigger>
    </Section>
  );
}
