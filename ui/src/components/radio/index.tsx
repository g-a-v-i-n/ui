import React from "react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import styles from "./styles.module.css";

export const Radio = ({
  className = "",
  ref,
  ...props
}: RadioGroupPrimitive.RadioGroupItemProps & {
  ref?: React.Ref<HTMLButtonElement>;
}) => {
  return (
    <RadioGroupPrimitive.Item
      {...props}
      ref={ref}
      className={`${styles.root} ${className}`}
    >
      <RadioGroupPrimitive.Indicator className={styles.indicator} />
    </RadioGroupPrimitive.Item>
  );
};
