import React from "react";
import styles from "./styles.module.css";
import { wrapTextChildren } from "../text/wrap";
import { cx } from "../../lib/cx";

type Variant = "primary" | "secondary" | "destructive";
type Width = "hug" | "fill" | "square";
type Size = "xs" | "sm" | "md" | "lg" | "xl";

export type ButtonProps = {
  variant?: Variant;
  /** Control height: xs 24 / sm 28 / md 34 / lg 40 / xl 48. */
  size?: Size;
  width?: Width;
  round?: boolean;
  prefixSlot?: React.ReactNode;
  suffixSlot?: React.ReactNode;
  children?: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "prefix" | "width">;

export const Button = ({
  variant = "primary",
  size = "md",
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
          inside an inline text span. The two shortest sizes drop the
          label one text step to keep it in proportion. */}
      {wrapTextChildren(children, size === "xs" || size === "sm" ? "sm" : "md")}
      {suffixSlot && <span className={styles.suffix}>{suffixSlot}</span>}
    </button>
  );
};
