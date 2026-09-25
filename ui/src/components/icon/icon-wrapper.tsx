import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import { iconSizes } from "../../lib/icon-sizes";
import type { IconWrapperProps } from "./types";

export const IconWrapper = ({
  className,
  size,
  width,
  height,
  viewBox = "0 0 18 18",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-hidden": ariaHidden,
  role,
  children,
  ...props
}: IconWrapperProps) => {
  // Explicit width/height win; otherwise fall back to the named size, then 20px.
  const px = size != null ? iconSizes[size] : undefined;
  const resolvedWidth = width ?? px ?? "20px";
  const resolvedHeight = height ?? px ?? "20px";
  // Unlabelled icons are decorative; a labelled one is announced as an image.
  const labelled = ariaLabel != null || ariaLabelledBy != null;
  return (
    <svg
      width={resolvedWidth}
      height={resolvedHeight}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cx(styles.icon, className)}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-hidden={ariaHidden ?? (labelled ? undefined : true)}
      role={role ?? (labelled ? "img" : undefined)}
      {...props}
    >
      {children}
    </svg>
  );
};
