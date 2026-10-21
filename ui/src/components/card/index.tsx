import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import type { PropsOf } from "../../lib/props";

type Variant = "primary" | "secondary";

export type CardProps = PropsOf<"div"> & {
  /** "primary" is raised (white / faint white wash + card shadow); "secondary" is flat (gray-a2 wash). */
  variant?: Variant;
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
