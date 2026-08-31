import React from "react";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";

type Variant = "primary" | "secondary";

type CardProps = React.ComponentPropsWithoutRef<"div"> & {
  /** "primary" is raised (bg-primary + card shadow); "secondary" is flat (bg-secondary). */
  variant?: Variant;
  ref?: React.Ref<HTMLDivElement>;
};

export const Card = ({
  variant = "primary",
  className,
  ref,
  ...props
}: CardProps) => {
  return (
    <div
      {...props}
      ref={ref}
      data-variant={variant}
      className={cx(styles.card, className)}
    />
  );
};
