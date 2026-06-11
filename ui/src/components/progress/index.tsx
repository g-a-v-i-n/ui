import React, { type Ref } from "react";
import { Progress as ProgressPrimitive } from "radix-ui";
import styles from "./styles.module.css";

export const Progress = React.forwardRef(
  (
    { className = "", ...props }: ProgressPrimitive.ProgressProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    const max = props.max ?? 100;
    const pct = Math.min(100, Math.max(0, ((props.value ?? 0) / max) * 100));

    return (
      <ProgressPrimitive.Root
        {...props}
        ref={forwardedRef}
        className={`${styles.root} ${className}`}
      >
        <ProgressPrimitive.Indicator
          className={styles.indicator}
          style={{ transform: `translateX(-${100 - pct}%)` }}
        />
      </ProgressPrimitive.Root>
    );
  }
);

Progress.displayName = "Progress";
