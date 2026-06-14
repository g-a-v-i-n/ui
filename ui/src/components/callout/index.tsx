import React from "react";
import { Text } from "../text";
import { SFSymbol } from "../sf-symbol";
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

// Default leading glyphs per variant. info/warning use SF Symbols (verify they
// render in SF Pro); success/error use the proven ✓/✕ marks.
const defaultIcon: Record<Variant, string> = {
  info: "􀅵",
  success: "􀁣",
  warning: "􀇿",
  error: "􀁡",
};

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
        {icon ?? <SFSymbol symbol={defaultIcon[variant]} size="lg" />}
      </span>
      <div className={styles.content}>
        {title && (
          <Text as="div" size="sm" weight="semibold" color="inherit">
            {title}
          </Text>
        )}
        {children && (
          <Text as="div" size="sm" color="inherit">
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
          <SFSymbol symbol="✕" size="sm" />
        </button>
      )}
    </div>
  );
};
