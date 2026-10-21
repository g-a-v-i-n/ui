import React from "react";
import { Text } from "../text";
import type { IconProps } from "../icon";
import { InfoCircleIcon } from "../icon/static/info-circle";
import { CheckCircleIcon } from "../icon/static/check-circle";
import { TriangleExclamationIcon } from "../icon/static/triangle-exclamation";
import { CircleXmarkIcon } from "../icon/static/circle-xmark";
import { XmarkIcon } from "../icon/static/xmark";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import type { PropsOf } from "../../lib/props";

type Variant = "info" | "success" | "warning" | "error";

export type CalloutProps = Omit<PropsOf<"div">, "title"> & {
  variant?: Variant;
  /** Optional bold heading rendered above the body. */
  title?: React.ReactNode;
  /** Override the default per-variant leading icon. */
  icon?: React.ReactNode;
  /** When provided, renders a trailing dismiss button. */
  onClose?: () => void;
};

// Default leading icon per variant, from the icon set.
const defaultIcon = {
  info: InfoCircleIcon,
  success: CheckCircleIcon,
  warning: TriangleExclamationIcon,
  error: CircleXmarkIcon,
} satisfies Record<Variant, React.ComponentType<IconProps>>;

export const Callout = ({
  variant = "info",
  title,
  icon,
  onClose,
  children,
  className,
  ref,
  ...props
}: CalloutProps) => {
  const DefaultIcon = defaultIcon[variant];
  return (
    <div
      {...props}
      ref={ref}
      data-variant={variant}
      role={variant === "warning" || variant === "error" ? "alert" : "status"}
      className={cx(styles.callout, className)}
    >
      <span className={styles.icon} aria-hidden="true">
        {icon ?? <DefaultIcon size="lg" />}
      </span>
      <div className={styles.content}>
        {title && (
          <Text
            as="div"
            size="md"
            weight="semibold"
            color="inherit"
            className={styles.title}
          >
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
          <XmarkIcon size="lg" />
        </button>
      )}
    </div>
  );
};
