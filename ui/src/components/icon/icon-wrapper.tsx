import styles from "./styles.module.css";
import type { IconWrapperProps } from "./types";

const sizes = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 18,
  xl: 22,
} as const;

export const IconWrapper = ({
  className = "",
  size,
  width,
  height,
  viewBox = "0 0 18 18",
  children,
  ...props
}: IconWrapperProps) => {
  // Explicit width/height win; otherwise fall back to the named size, then 20px.
  const px = size != null ? sizes[size] : undefined;
  const resolvedWidth = width ?? px ?? "20px";
  const resolvedHeight = height ?? px ?? "20px";
  return (
    <svg
      width={resolvedWidth}
      height={resolvedHeight}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.icon + " " + className}
      {...props}
    >
      {children}
    </svg>
  );
};
