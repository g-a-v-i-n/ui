import React from "react";
import { Label as LabelPrimitive } from "radix-ui";
import { Text } from "../text";
import styles from "./styles.module.css";

type LabelProps = LabelPrimitive.LabelProps & {
  size?: "xs" | "sm" | "md";
  weight?: "regular" | "medium" | "semibold";
  color?: "primary" | "secondary" | "tertiary" | "inherit";
};

export const Label = ({
  children,
  className = "",
  size = "sm",
  weight = "medium",
  color = "primary",
  ref,
  ...props
}: LabelProps & { ref?: React.Ref<HTMLLabelElement> }) => {
  return (
    <LabelPrimitive.Root {...props} ref={ref} asChild>
      <Text
        as="label"
        size={size}
        weight={weight}
        color={color}
        className={`${styles.label} ${className}`}
      >
        {children}
      </Text>
    </LabelPrimitive.Root>
  );
};
