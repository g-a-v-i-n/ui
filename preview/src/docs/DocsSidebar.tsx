import { Label } from 'ui/components/label';
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from 'ui/components/select';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarSection,
  SidebarItem,
} from 'ui/components/sidebar';
import { Tag } from 'ui/components/tag';
import { Text } from 'ui/components/text';
import { GRAY_TONES, type GrayTone } from 'ui/components/theme';
import uiPackage from 'ui/package.json';
import { groups, type Page } from './registry';
import { useLinkProps } from './navigation';
import styles from './docs.module.css';

type ThemeChoice = 'light' | 'dark' | 'system';
const THEMES: ThemeChoice[] = ['light', 'dark', 'system'];

function isTheme(value: string): value is ThemeChoice {
  return (THEMES as string[]).includes(value);
}
function isGrayTone(value: string): value is GrayTone {
  return (GRAY_TONES as readonly string[]).includes(value);
}

function NavItem({ page }: { page: Page }) {
  const { href, active, onClick } = useLinkProps(page.path);
  return (
    <SidebarItem href={href} active={active} onClick={onClick}>
      {page.name}
    </SidebarItem>
  );
}

function HomeItem() {
  const { href, active, onClick } = useLinkProps('/');
  return (
    <SidebarItem href={href} active={active} onClick={onClick}>
      Overview
    </SidebarItem>
  );
}

export function DocsSidebar({
  theme,
  onThemeChange,
  resolvedTheme,
  gray,
  onGrayChange,
}: {
  theme: ThemeChoice;
  onThemeChange: (theme: ThemeChoice) => void;
  resolvedTheme: 'light' | 'dark';
  gray: GrayTone;
  onGrayChange: (gray: GrayTone) => void;
}) {
  return (
    <Sidebar>
      <SidebarHeader>
        <Text size="sm" weight="semibold">
          UI
        </Text>
        <Tag mono>v{uiPackage.version}</Tag>
      </SidebarHeader>
      <SidebarContent>
        <SidebarSection>
          <HomeItem />
        </SidebarSection>
        {groups.map((group) => (
          <SidebarSection key={group.group} label={group.label}>
            {group.pages.map((page) => (
              <NavItem key={page.path} page={page} />
            ))}
          </SidebarSection>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <div className={styles.sidebarSettings}>
          <div className={styles.controlInline}>
            <Label htmlFor="docs-theme" size="xs" color="secondary">
              Theme
            </Label>
            <SelectRoot
              value={theme}
              onValueChange={(next) => {
                if (isTheme(next)) onThemeChange(next);
              }}
            >
              <SelectTrigger id="docs-theme" aria-label="Theme">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {THEMES.map((choice) => (
                  <SelectItem key={choice} value={choice}>
                    {choice === 'system' ? `system (${resolvedTheme})` : choice}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </div>
          <div className={styles.controlInline}>
            <Label htmlFor="docs-gray" size="xs" color="secondary">
              Gray
            </Label>
            <SelectRoot
              value={gray}
              onValueChange={(next) => {
                if (isGrayTone(next)) onGrayChange(next);
              }}
            >
              <SelectTrigger id="docs-gray" aria-label="Gray tone">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {GRAY_TONES.map((tone) => (
                  <SelectItem key={tone} value={tone}>
                    {tone === 'gray' ? 'neutral' : tone}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
