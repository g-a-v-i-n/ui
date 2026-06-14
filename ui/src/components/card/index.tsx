import React from "react";
import styles from "./styles.module.css";

type Variant = "elevated" | "filled";
type Elevation = "low" | "medium" | "high";
type Tone = "subtle" | "muted" | "strong";

type CardProps = React.ComponentPropsWithoutRef<"div"> & {
  /** "elevated" lifts the card with a shadow; "filled" is flat with a tonal background. */
  variant?: Variant;
  /** Shadow depth — only applies when variant="elevated". */
  elevation?: Elevation;
  /** Background shade — only applies when variant="filled". */
  tone?: Tone;
  ref?: React.Ref<HTMLDivElement>;
};

export const Card = ({
  variant = "elevated",
  elevation = "low",
  tone = "subtle",
  className = "",
  ref,
  ...props
}: CardProps) => {
  return (
    <div
      {...props}
      ref={ref}
      data-variant={variant}
      data-elevation={variant === "elevated" ? elevation : undefined}
      data-tone={variant === "filled" ? tone : undefined}
      className={`${styles.card} ${className}`}
    />
  );
};
