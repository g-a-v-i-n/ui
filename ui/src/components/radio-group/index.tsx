import React from "react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import styles from "./styles.module.css";

export const RadioGroup = ({
  className = "",
  ref,
  ...props
}: RadioGroupPrimitive.RadioGroupProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <RadioGroupPrimitive.Root
      {...props}
      ref={ref}
      className={`${styles.group} ${className}`}
    />
  );
};
