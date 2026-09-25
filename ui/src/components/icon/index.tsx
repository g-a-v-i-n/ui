export type { IconProps, IconWrapperProps } from "./types";
export { IconWrapper } from "./icon-wrapper";

import type { IconProps } from "./types";
import { icons } from "./registry";

export { icons };

export type IconName = keyof typeof icons;
export const iconNames =
  // SAFETY: `icons` is keyed exactly by IconName, so its runtime keys are that union.
  Object.keys(icons) as IconName[];

type IconComponentProps = {
  icon: IconName;
} & IconProps;

export const Icon = ({ icon, ...props }: IconComponentProps) => {
  const IconComponent = icons[icon];
  return <IconComponent {...props} />;
};
