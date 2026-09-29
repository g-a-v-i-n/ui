import React from "react";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import { iconSizes, type IconSize } from "../../lib/icon-sizes";

export type SpinnerProps = {
  /** Named size in px, on the same scale as Icon. */
  size?: IconSize;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
};

export function Spinner({
  size = "md",
  label = "Loading",
  className,
  style,
}: SpinnerProps) {
  const px = iconSizes[size];

  return (
    <span
      role="status"
      aria-label={label}
      className={cx(styles.spinner, className)}
      style={{ width: px, height: px, ...style }}
    >
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle
          cx="8"
          cy="8"
          r="6.5"
          strokeWidth="2"
          className={styles.track}
        />
        <circle
          cx="8"
          cy="8"
          r="6.5"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="28 72"
          className={styles.indicator}
        />
      </svg>
    </span>
  );
}
