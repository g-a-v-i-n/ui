/**
 * The string-keyed icon API — `<Icon icon="check" />` — plus the name list
 * for pickers and docs. Importing this entry bundles every glyph in the set,
 * so prefer the named components from `ui/components/icon` wherever the icon
 * is known at build time.
 */
import type { IconProps as GlyphProps } from "../types";
import { icons } from "./icons";

export { icons };

export type IconName = keyof typeof icons;
export const iconNames =
  // SAFETY: `icons` is keyed exactly by IconName, so its runtime keys are that union.
  Object.keys(icons) as IconName[];

/** Props of `Icon`: a glyph's props plus the name that picks the glyph. */
export type IconProps = GlyphProps & {
  icon: IconName;
};

export const Icon = ({ icon, ...props }: IconProps) => {
  const IconComponent = icons[icon];
  return <IconComponent {...props} />;
};
