export type { IconProps, IconWeight, IconWrapperProps } from "./types";
export { IconWrapper } from "./icon-wrapper";

import type { IconProps, IconWeight } from "./types";
import { icons } from "./registry";

export { icons };

export type IconName = keyof typeof icons.normal;
export const iconNames = Object.keys(icons.normal) as IconName[];

type IconComponentProps = {
  icon: IconName;
} & IconProps;

export const Icon = ({ icon, weight = "normal", ...props }: IconComponentProps) => {
  const weightedIcons = (icons[weight as keyof typeof icons] ?? {}) as Partial<typeof icons.normal>;
  const IconComponent = weightedIcons[icon] ?? icons.normal[icon];
  return <IconComponent {...props} />;
};
