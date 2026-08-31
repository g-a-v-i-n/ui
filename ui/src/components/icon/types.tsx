import type { IconSize } from "../../lib/icon-sizes";

export type { IconSize };
export type IconWeight = "normal" | "bold";

export type IconProps = {
  className?: string;
  style?: React.CSSProperties;
  /** Named size in px (matches the SFSymbol scale). Overridden by width/height. */
  size?: IconSize;
  /** Visual stroke/fill weight. Falls back to normal when a weighted glyph is missing. */
  weight?: IconWeight;
  width?: string | number;
  height?: string | number;
  viewBox?: string;
};

export type IconWrapperProps = {
  children?: React.ReactNode;
} & IconProps;
