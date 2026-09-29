import {
  NavigationMenuRoot,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from 'ui/components/navigation-menu';
import { defineDoc } from '../types';

const MENUS = [
  { label: 'Product', links: ['Overview', 'Changelog', 'Pricing', 'Roadmap', 'Integrations'] },
  { label: 'Resources', links: ['Documentation', 'Guides', 'Community', 'Support', 'Status'] },
  { label: 'Company', links: ['About', 'Careers', 'Press', 'Contact', 'Legal'] },
];

export const doc = defineDoc({
  description:
    'Top-level site navigation whose triggers open link panels in a shared, animated viewport.',
  propsFor: [
    'NavigationMenuRoot',
    'NavigationMenuList',
    'NavigationMenuItem',
    'NavigationMenuTrigger',
    'NavigationMenuContent',
    'NavigationMenuLink',
    'NavigationMenuSub',
  ],
  controls: {
    menus: { type: 'number', default: 2, min: 1, max: 3, step: 1 },
    links: { type: 'number', label: 'Links per menu', default: 3, min: 2, max: 5, step: 1 },
    plainLink: { type: 'boolean', label: 'Trailing plain link', default: true },
    delayDuration: { type: 'number', label: 'Hover delay (ms)', default: 200, min: 0, max: 1000, step: 50 },
  },
  /* The viewport renders in place below the list rather than in a portal, so
     the menu sits at the top of the stage to leave it room to open. */
  render: ({ menus, links, plainLink, delayDuration }) => (
    <div style={{ alignSelf: 'flex-start' }}>
      <NavigationMenuRoot delayDuration={delayDuration}>
        <NavigationMenuList>
          {MENUS.slice(0, menus).map((menu) => (
            <NavigationMenuItem key={menu.label}>
              <NavigationMenuTrigger>{menu.label}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, width: 200 }}>
                  {menu.links.slice(0, links).map((link) => (
                    <NavigationMenuLink key={link} href="#">
                      {link}
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
          {plainLink && (
            <NavigationMenuItem>
              <NavigationMenuLink href="#">Blog</NavigationMenuLink>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenuRoot>
    </div>
  ),
});
