import React from "react";
import { Text } from "../text";
import { Icon, type IconName } from "../icon";
import styles from "./styles.module.css";

type Variant = "info" | "success" | "warning" | "error";

type CalloutProps = Omit<React.ComponentPropsWithoutRef<"div">, "title"> & {
  variant?: Variant;
  /** Optional bold heading rendered above the body. */
  title?: React.ReactNode;
  /** Override the default per-variant leading icon. */
  icon?: React.ReactNode;
  /** When provided, renders a trailing dismiss button. */
  onClose?: () => void;
  ref?: React.Ref<HTMLDivElement>;
};

// Default leading icon per variant, from the icon set.
const defaultIcon = {
  info: "info-circle",
  success: "check-circle",
  warning: "triangle-exclamation",
  error: "circle-xmark",
} satisfies Record<Variant, IconName>;

export const Callout = ({
  variant = "info",
  title,
  icon,
  onClose,
  children,
  className = "",
  ref,
  ...props
}: CalloutProps) => {
  return (
    <div
      {...props}
      ref={ref}
      data-variant={variant}
      role={variant === "warning" || variant === "error" ? "alert" : "status"}
      className={`${styles.callout} ${className}`}
    >
      <span className={styles.icon} aria-hidden="true">
        {icon ?? <Icon icon={defaultIcon[variant]} size="lg" />}
      </span>
      <div className={styles.content}>
        {title && (
          <Text as="div" size="md" weight="semibold" color="inherit">
            {title}
          </Text>
        )}
        {children && (
          <Text as="div" size="md" color="inherit">
            {children}
          </Text>
        )}
      </div>
      {onClose && (
        <button
          type="button"
          className={styles.close}
          aria-label="Dismiss"
          onClick={onClose}
        >
          <Icon icon="x-mark" size="md" />
        </button>
      )}
    </div>
  );
};
