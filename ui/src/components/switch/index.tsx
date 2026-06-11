import React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";
import styles from "./styles.module.css";

export const Switch = React.forwardRef<
  HTMLButtonElement,
  SwitchPrimitive.SwitchProps
>(({ className = "", ...props }, forwardedRef) => {
  return (
    <SwitchPrimitive.Root
      {...props}
      ref={forwardedRef}
      className={`${styles.track} ${className}`}
    >
      <SwitchPrimitive.Thumb className={styles.thumb} />
    </SwitchPrimitive.Root>
  );
});

Switch.displayName = "Switch";
