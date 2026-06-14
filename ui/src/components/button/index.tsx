import React from "react";
import { Text } from "../text";
import styles from "./styles.module.css";

type Variant = "primary" | "secondary" | "destructive";
type Width = "hug" | "fill" | "square";
type Size = "sm" | "md" | "lg" | "xl";

export type ButtonProps = {
  variant?: Variant;
  /** Control height: sm 24 / md 28 / lg 32 / xl 40. */
  size?: Size;
  width?: Width;
  round?: boolean;
  prefixSlot?: React.ReactNode;
  suffixSlot?: React.ReactNode;
  children?: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "prefix" | "width">;

export const Button = ({
  variant = "primary",
  size = "lg",
  width = "hug",
  round = false,
  prefixSlot,
  suffixSlot,
  className = "",
  children,
  ref,
  ...props
}: ButtonProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  return (
    <button
      ref={ref}
      data-variant={variant}
      data-size={size}
      data-width={width}
      data-round={round || undefined}
      className={`${styles.button} ${className}`}
      {...props}
    >
      {prefixSlot && <span className={styles.prefix}>{prefixSlot}</span>}
      {children != null && (
        <Text as="span" size={size === "xl" ? "md" : "sm"} weight="medium">
          {children}
        </Text>
      )}
      {suffixSlot && <span className={styles.suffix}>{suffixSlot}</span>}
    </button>
  );
};
