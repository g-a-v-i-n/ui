import React, { type Ref } from "react";
import { Label as LabelPrimitive } from "radix-ui";
import { Text } from "../text";
import styles from "./styles.module.css";

type LabelProps = LabelPrimitive.LabelProps & {
  size?: "xs" | "sm" | "md";
  weight?: "regular" | "medium" | "semibold";
  color?: "primary" | "secondary" | "tertiary" | "inherit";
};

export const Label = React.forwardRef(
  (
    {
      children,
      className = "",
      size = "sm",
      weight = "medium",
      color = "primary",
      ...props
    }: LabelProps,
    forwardedRef: Ref<HTMLLabelElement> | undefined
  ) => {
    return (
      <LabelPrimitive.Root {...props} ref={forwardedRef} asChild>
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
  }
);

Label.displayName = "Label";
