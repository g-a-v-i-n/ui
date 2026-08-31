import React, { Children } from "react";
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
      {/* Only wrap plain text in Text — element children (icons) stay direct
          flex items so align-items centers them instead of baseline-sitting
          inside an inline text span. */}
      {Children.map(children, (child) =>
        typeof child === "string" || typeof child === "number" ? (
          <Text as="span" size="md" weight="medium">
            {child}
          </Text>
        ) : (
          child
        )
      )}
      {suffixSlot && <span className={styles.suffix}>{suffixSlot}</span>}
    </button>
  );
};
