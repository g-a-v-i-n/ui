import React, { type Ref } from "react";
import { Separator as SeparatorPrimitive } from "radix-ui";
import styles from "./styles.module.css";

export const Separator = React.forwardRef(
  (
    { className = "", ...props }: SeparatorPrimitive.SeparatorProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <SeparatorPrimitive.Root
        {...props}
        ref={forwardedRef}
        className={`${styles.root} ${className}`}
      />
    );
  }
);

Separator.displayName = "Separator";
