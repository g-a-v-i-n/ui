import React from "react";
import { Text } from "../text";
import styles from "./styles.module.css";

type Variant = "primary" | "secondary" | "destructive";
type Width = "hug" | "fill" | "square";

export type ButtonProps = {
  variant?: Variant;
  width?: Width;
  round?: boolean;
  prefixSlot?: React.ReactNode;
  suffixSlot?: React.ReactNode;
  children?: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "prefix" | "width">;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      width = "hug",
      round = false,
      prefixSlot,
      suffixSlot,
      className = "",
      children,
      ...props
    },
    forwardedRef
  ) => {
    return (
      <button
        ref={forwardedRef}
        data-variant={variant}
        data-width={width}
        data-round={round || undefined}
        className={`${styles.button} ${className}`}
        {...props}
      >
        {prefixSlot && <span className={styles.prefix}>{prefixSlot}</span>}
        {children != null && (
          <Text as="span" size="sm" weight="medium">
            {children}
          </Text>
        )}
        {suffixSlot && <span className={styles.suffix}>{suffixSlot}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
