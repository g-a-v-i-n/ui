import { useState } from 'react';
import { Icon } from 'ui/components/icon';
import { Text } from 'ui/components/text';
import { Tag } from 'ui/components/tag';
import { Avatar } from 'ui/components/avatar';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarSection as SidebarSectionGroup,
  SidebarItem,
  SidebarSeparator,
  SidebarCollapsibleSection,
} from 'ui/components/sidebar';
import { Section } from '../../Section';
import styles from './styles.module.css';

export function SidebarSection() {
  const [sidebarItem, setSidebarItem] = useState('inbox');

  return (
    <Section title="Sidebar">
      <div className={styles.container}>
        <Sidebar>
          <SidebarHeader>
            <Avatar size="sm" fallback="UI" />
            <Text size="sm" weight="medium">
              Workspace
            </Text>
          </SidebarHeader>
          <SidebarContent>
            <SidebarSectionGroup>
              <SidebarItem
                active={sidebarItem === 'inbox'}
                onClick={() => setSidebarItem('inbox')}
                prefixSlot={<Icon icon="folder" size="sm" />}
                suffixSlot={<Tag>3</Tag>}
              >
                Inbox
              </SidebarItem>
              <SidebarItem
                active={sidebarItem === 'drafts'}
                onClick={() => setSidebarItem('drafts')}
                prefixSlot={<Icon icon="document" size="sm" />}
              >
                Drafts
              </SidebarItem>
              <SidebarItem
                active={sidebarItem === 'sent'}
                onClick={() => setSidebarItem('sent')}
                prefixSlot={<Icon icon="arrow-up" size="sm" />}
              >
                Sent
              </SidebarItem>
            </SidebarSectionGroup>
            <SidebarSectionGroup label="Projects">
              <SidebarItem
                active={sidebarItem === 'design'}
                onClick={() => setSidebarItem('design')}
              >
                Design system
              </SidebarItem>
              <SidebarItem
                active={sidebarItem === 'website'}
                onClick={() => setSidebarItem('website')}
              >
                Website refresh
              </SidebarItem>
              <SidebarItem disabled>Archived project</SidebarItem>
            </SidebarSectionGroup>
            <SidebarSeparator />
            <SidebarCollapsibleSection label="Favorites">
              <SidebarItem
                active={sidebarItem === 'roadmap'}
                onClick={() => setSidebarItem('roadmap')}
              >
                Roadmap with a very long name that truncates
              </SidebarItem>
              <SidebarItem href="#">Link item</SidebarItem>
            </SidebarCollapsibleSection>
          </SidebarContent>
          <SidebarFooter>
            <SidebarItem prefixSlot={<Icon icon="slider-horizontal" size="sm" />}>
              Settings
            </SidebarItem>
          </SidebarFooter>
        </Sidebar>
        <div className={styles.preview}>
          <Text size="sm" color="secondary">
            selected: {sidebarItem}
          </Text>
        </div>
      </div>
    </Section>
  );
}
