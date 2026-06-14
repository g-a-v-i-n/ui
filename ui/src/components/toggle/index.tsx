import React, { Children } from "react";
import { Toggle as TogglePrimitive } from "radix-ui";
import { Text } from "../text";
import styles from "./styles.module.css";

export const Toggle = ({
  children,
  className = "",
  width = "hug",
  ref,
  ...props
}: TogglePrimitive.ToggleProps & { width?: "hug" | "square" } & { ref?: React.Ref<HTMLButtonElement> }) => {
  return (
    <TogglePrimitive.Root
      {...props}
      ref={ref}
      data-width={width}
      className={`${styles.toggle} ${className}`}
    >
      {Children.map(children, (child) =>
        typeof child === "string" || typeof child === "number" ? (
          <Text as="span" size="sm" weight="medium">
            {child}
          </Text>
        ) : (
          child
        )
      )}
    </TogglePrimitive.Root>
  );
};
