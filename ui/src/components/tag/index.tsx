import type { ReactNode } from "react";
import { Text } from "../text";
import styles from "./styles.module.css";

type Variant = "default" | "success" | "warning" | "error";

type TagProps = {
  children: ReactNode;
  variant?: Variant;
  round?: boolean;
  className?: string;
};

export const Tag = ({
  children,
  variant = "default",
  round = false,
  className = "",
}: TagProps) => {
  return (
    <span
      data-variant={variant}
      data-round={round || undefined}
      className={`${styles.tag} ${className}`}
    >
      <Text as="span" size="xs" weight="medium" color="inherit">
        {children}
      </Text>
    </span>
  );
};
