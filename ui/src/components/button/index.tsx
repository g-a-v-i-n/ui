import React from "react";
import styles from "./styles.module.css";
import { wrapTextChildren } from "../text/wrap";
import { cx } from "../../lib/cx";

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
  className,
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
      className={cx(styles.button, className)}
      {...props}
    >
      {prefixSlot && <span className={styles.prefix}>{prefixSlot}</span>}
      {/* Only wrap plain text in Text — element children (icons) stay direct
          flex items so align-items centers them instead of baseline-sitting
          inside an inline text span. */}
      {wrapTextChildren(children, "md")}
      {suffixSlot && <span className={styles.suffix}>{suffixSlot}</span>}
    </button>
  );
};
