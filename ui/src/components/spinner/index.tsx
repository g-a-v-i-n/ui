import React from "react";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import { iconSizes } from "../../lib/icon-sizes";

/* sm, md and lg match the Icon sizes of the same name: sm sits in a control's
   slot, md on its own, lg in a block or empty state. xl is the spinner's own
   32px step for page- and panel-level loading, well clear of the lg icon. */
export const SPINNER_SIZES = ["sm", "md", "lg", "xl"] as const;
export type SpinnerSize = (typeof SPINNER_SIZES)[number];

const spinnerSizes = {
  sm: iconSizes.sm,
  md: iconSizes.md,
  lg: iconSizes.lg,
  xl: 32,
} satisfies Record<SpinnerSize, number>;

export type SpinnerProps = {
  /** Named size: sm, md and lg match the Icon of the same name; xl is 32px. */
  size?: SpinnerSize;
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
  const px = spinnerSizes[size];

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
