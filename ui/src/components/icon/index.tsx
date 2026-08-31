export type { IconProps, IconWeight, IconWrapperProps } from "./types";
export { IconWrapper } from "./icon-wrapper";

import type { IconProps } from "./types";
import { icons } from "./registry";

export { icons };

export type IconName = keyof typeof icons.normal;
export const iconNames =
  // SAFETY: `icons.normal` is keyed exactly by IconName, so its runtime keys are that union.
  Object.keys(icons.normal) as IconName[];

type IconComponentProps = {
  icon: IconName;
} & IconProps;

export const Icon = ({ icon, weight = "normal", ...props }: IconComponentProps) => {
  // SAFETY: non-normal weights may cover fewer names than normal, so a weight's
  // map is a partial view of the normal name space; missing names fall back below.
  const weightedIcons = icons[weight] as Partial<typeof icons.normal>;
  const IconComponent = weightedIcons[icon] ?? icons.normal[icon];
  return <IconComponent {...props} />;
};
