import React from "react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import styles from "./styles.module.css";

export const RadioGroup = React.forwardRef<
  HTMLDivElement,
  RadioGroupPrimitive.RadioGroupProps
>(({ className = "", ...props }, forwardedRef) => {
  return (
    <RadioGroupPrimitive.Root
      {...props}
      ref={forwardedRef}
      className={`${styles.group} ${className}`}
    />
  );
});

RadioGroup.displayName = "RadioGroup";
