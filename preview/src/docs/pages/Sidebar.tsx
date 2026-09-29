import { useState, type ReactNode } from 'react';
import { Avatar } from 'ui/components/avatar';
import { Icon, type IconName } from 'ui/components/icon';
import { Tag } from 'ui/components/tag';
import { Text } from 'ui/components/text';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarSection,
  SidebarItem,
  SidebarSeparator,
  SidebarCollapsibleSection,
} from 'ui/components/sidebar';
import { defineDoc, type Controls, type ControlValues } from '../types';

const controls = {
  header: { type: 'boolean', default: true },
  footer: { type: 'boolean', default: true },
  icons: { type: 'boolean', label: 'Item icons', default: true },
  badge: { type: 'boolean', label: 'Count badge', default: true },
  collapsible: { type: 'boolean', label: 'Collapsible section', default: true },
  collapsibleOpen: { type: 'boolean', label: 'Collapsible open initially', default: true },
} as const satisfies Controls;

/* `active` is a plain prop, so the example tracks the selected item itself.
   The sidebar fills its container's height; the box keeps it stage-sized. */
function Example({
  header,
  footer,
  icons,
  badge,
  collapsible,
  collapsibleOpen,
}: ControlValues<typeof controls>) {
  const [selected, setSelected] = useState('inbox');
  const item = (value: string, label: string, icon?: IconName, suffix?: ReactNode) => (
    <SidebarItem
      active={selected === value}
      onClick={() => setSelected(value)}
      prefixSlot={icons && icon ? <Icon icon={icon} size="sm" /> : undefined}
      suffixSlot={suffix}
    >
      {label}
    </SidebarItem>
  );

  return (
    <div
      style={{
        display: 'flex',
        height: 320,
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <Sidebar>
        {header && (
          <SidebarHeader>
            <Avatar size="sm" fallback="UI" />
            <Text size="sm" weight="medium">
              Workspace
            </Text>
          </SidebarHeader>
        )}
        <SidebarContent>
          <SidebarSection>
            {item('inbox', 'Inbox', 'folder', badge ? <Tag>3</Tag> : undefined)}
            {item('drafts', 'Drafts', 'document')}
            {item('sent', 'Sent', 'arrow-up')}
          </SidebarSection>
          <SidebarSection label="Projects">
            {item('design', 'Design system')}
            {item('website', 'Website refresh')}
            <SidebarItem disabled>Archived project</SidebarItem>
          </SidebarSection>
          {collapsible && (
            <>
              <SidebarSeparator />
              <SidebarCollapsibleSection
                key={String(collapsibleOpen)}
                label="Favorites"
                defaultOpen={collapsibleOpen}
              >
                {item('roadmap', 'Roadmap with a very long name that truncates')}
                <SidebarItem href="#">Link item</SidebarItem>
              </SidebarCollapsibleSection>
            </>
          )}
        </SidebarContent>
        {footer && (
          <SidebarFooter>
            <SidebarItem prefixSlot={icons ? <Icon icon="gear" size="sm" /> : undefined}>
              Settings
            </SidebarItem>
          </SidebarFooter>
        )}
      </Sidebar>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 176,
          background: 'var(--bg-primary)',
        }}
      >
        <Text size="sm" color="secondary">
          selected: {selected}
        </Text>
      </div>
    </div>
  );
}

export const doc = defineDoc({
  description:
    'An app navigation column with a header, footer, and menu-style items grouped into plain or collapsible sections.',
  controls,
  render: (values) => <Example {...values} />,
});
