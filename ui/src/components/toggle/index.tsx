import React, { Children, type Ref } from "react";
import { Toggle as TogglePrimitive } from "radix-ui";
import { Text } from "../text";
import styles from "./styles.module.css";

export const Toggle = React.forwardRef(
  (
    { children, className = "", ...props }: TogglePrimitive.ToggleProps,
    forwardedRef: Ref<HTMLButtonElement> | undefined
  ) => {
    return (
      <TogglePrimitive.Root
        {...props}
        ref={forwardedRef}
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
  }
);

Toggle.displayName = "Toggle";
