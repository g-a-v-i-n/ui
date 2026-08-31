import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import { iconSizes } from "../../lib/icon-sizes";
import type { IconWrapperProps } from "./types";

export const IconWrapper = ({
  className,
  size,
  weight: _weight,
  width,
  height,
  viewBox = "0 0 18 18",
  children,
  ...props
}: IconWrapperProps) => {
  // Explicit width/height win; otherwise fall back to the named size, then 20px.
  const px = size != null ? iconSizes[size] : undefined;
  const resolvedWidth = width ?? px ?? "20px";
  const resolvedHeight = height ?? px ?? "20px";
  return (
    <svg
      width={resolvedWidth}
      height={resolvedHeight}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cx(styles.icon, className)}
      {...props}
    >
      {children}
    </svg>
  );
};
