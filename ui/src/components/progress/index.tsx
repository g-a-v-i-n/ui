import React from "react";
import { Progress as ProgressPrimitive } from "radix-ui";
import styles from "./styles.module.css";

export const Progress = ({
  className = "",
  animated = false,
  ref,
  ...props
}: ProgressPrimitive.ProgressProps & {
  /** Continuously sweep a left-to-right gradient across the fill. */
  animated?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const max = props.max ?? 100;
  const pct = Math.min(100, Math.max(0, ((props.value ?? 0) / max) * 100));

  return (
    <ProgressPrimitive.Root
      {...props}
      ref={ref}
      className={`${styles.root} ${className}`}
    >
      <ProgressPrimitive.Indicator
        className={styles.indicator}
        data-animated={animated || undefined}
        style={{ transform: `translateX(-${100 - pct}%)` }}
      />
    </ProgressPrimitive.Root>
  );
};
