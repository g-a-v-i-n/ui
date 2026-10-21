import React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import type { PropsOf } from "../../lib/props";

export type SwitchProps = PropsOf<typeof SwitchPrimitive.Root>;

export const Switch = ({
  className,
  ref,
  ...props
}: SwitchProps) => {
  return (
    <SwitchPrimitive.Root
      {...props}
      ref={ref}
      className={cx(styles.track, className)}
    >
      <SwitchPrimitive.Thumb className={styles.thumb} />
    </SwitchPrimitive.Root>
  );
};
