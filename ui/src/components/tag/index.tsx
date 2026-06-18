import type { ReactNode } from "react";
import { Text } from "../text";
import styles from "./styles.module.css";

type Variant = "default" | "success" | "warning" | "error";

type TagProps = {
  children: ReactNode;
  variant?: Variant;
  /** Softer, tonal styling using the Callout background palette. */
  secondary?: boolean;
  round?: boolean;
  mono?: boolean;
  className?: string;
};

export const Tag = ({
  children,
  variant = "default",
  secondary = false,
  round = false,
  mono = false,
  className = "",
}: TagProps) => {
  return (
    <span
      data-variant={variant}
      data-secondary={secondary || undefined}
      data-round={round || undefined}
      className={`${styles.tag} ${className}`}
    >
      <Text as="span" size="xs" weight="semibold" color="inherit" mono={mono}>
        {children}
      </Text>
    </span>
  );
};
