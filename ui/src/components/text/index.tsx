import React from "react";
import styles from "./styles.module.css";

type Size = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
type Weight = "regular" | "medium" | "semibold" | "bold";
type Color = "primary" | "secondary" | "tertiary" | "inherit";
type As = "span" | "p" | "div" | "label" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type Transform = "uppercase" | "lowercase" | "capitalize" | "none";
type Decoration = "underline" | "line-through" | "none";

type TextProps = {
  as?: As;
  size?: Size;
  weight?: Weight;
  color?: Color;
  truncate?: boolean;
  tabularNumbers?: boolean;
  mono?: boolean;
  transform?: Transform;
  decoration?: Decoration;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.AllHTMLAttributes<HTMLElement>, "color" | "size">;

export function Text({
  as: Tag = "span",
  size = "md",
  weight = "regular",
  color = "inherit",
  truncate = false,
  tabularNumbers = false,
  mono = false,
  transform,
  decoration,
  className = "",
  children,
  ...props
}: TextProps) {
  return (
    <Tag
      data-size={size}
      data-weight={weight}
      data-color={color}
      data-truncate={truncate || undefined}
      data-tabular={tabularNumbers || undefined}
      data-mono={mono || undefined}
      data-transform={transform}
      data-decoration={decoration}
      className={`${styles.text} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
