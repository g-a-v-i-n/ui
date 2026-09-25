import type { IconSize } from "../../lib/icon-sizes";

export type { IconSize };

export type IconProps = Pick<
  React.SVGAttributes<SVGSVGElement>,
  "aria-label" | "aria-labelledby" | "aria-hidden" | "role"
> & {
  className?: string;
  style?: React.CSSProperties;
  /** Named size in px. Overridden by width/height. */
  size?: IconSize;
  width?: string | number;
  height?: string | number;
  viewBox?: string;
};

export type IconWrapperProps = {
  children?: React.ReactNode;
} & IconProps;
