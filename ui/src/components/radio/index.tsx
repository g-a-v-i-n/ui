import React from "react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import styles from "./styles.module.css";

export const Radio = React.forwardRef<
  HTMLButtonElement,
  RadioGroupPrimitive.RadioGroupItemProps
>(({ className = "", ...props }, forwardedRef) => {
  return (
    <RadioGroupPrimitive.Item
      {...props}
      ref={forwardedRef}
      className={`${styles.root} ${className}`}
    >
      <RadioGroupPrimitive.Indicator className={styles.indicator} />
    </RadioGroupPrimitive.Item>
  );
});

Radio.displayName = "Radio";
