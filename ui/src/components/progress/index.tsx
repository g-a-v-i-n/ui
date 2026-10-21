import { Progress as ProgressPrimitive } from "radix-ui";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import type { PropsOf } from "../../lib/props";

export type ProgressProps = PropsOf<typeof ProgressPrimitive.Root> & {
  /** Continuously sweep a left-to-right gradient across the fill. */
  animated?: boolean;
};

export const Progress = ({
  className,
  animated = false,
  ref,
  ...props
}: ProgressProps) => {
  const max = props.max != null && props.max > 0 ? props.max : 100;
  // No value means indeterminate: leave the indicator untransformed.
  const pct =
    props.value == null
      ? null
      : Math.min(100, Math.max(0, (props.value / max) * 100));

  return (
    <ProgressPrimitive.Root
      {...props}
      ref={ref}
      className={cx(styles.root, className)}
    >
      <ProgressPrimitive.Indicator
        className={styles.indicator}
        data-animated={animated || undefined}
        style={
          pct == null ? undefined : { transform: `translateX(-${100 - pct}%)` }
        }
      />
    </ProgressPrimitive.Root>
  );
};
