import React from "react";
import { Separator as SeparatorPrimitive } from "radix-ui";
import styles from "./styles.module.css";

export const Separator = ({ className = "", ref, ...props }: SeparatorPrimitive.SeparatorProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <SeparatorPrimitive.Root
      {...props}
      ref={ref}
      className={`${styles.root} ${className}`}
    />
  );
};
