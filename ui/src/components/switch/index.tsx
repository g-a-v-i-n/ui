import React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";
import styles from "./styles.module.css";

export const Switch = ({
  className = "",
  ref,
  ...props
}: SwitchPrimitive.SwitchProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  return (
    <SwitchPrimitive.Root
      {...props}
      ref={ref}
      className={`${styles.track} ${className}`}
    >
      <SwitchPrimitive.Thumb className={styles.thumb} />
    </SwitchPrimitive.Root>
  );
};
