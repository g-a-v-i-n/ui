export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export type IconProps = {
  className?: string;
  style?: React.CSSProperties;
  /** Named size in px (matches the SFSymbol scale). Overridden by width/height. */
  size?: IconSize;
  width?: string | number;
  height?: string | number;
  viewBox?: string;
};

export type IconWrapperProps = {
  children?: React.ReactNode;
} & IconProps;
