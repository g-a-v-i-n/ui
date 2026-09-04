import React from "react";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";

export type TextAreaProps = Omit<
  React.ComponentPropsWithoutRef<"textarea">,
  "rows"
> & {
  /** Visible rows at minimum height. */
  rows?: number;
  /** Grow with content (CSS field-sizing) up to maxRows. */
  autoResize?: boolean;
  /** Caps the height when autoResize is set. */
  maxRows?: number;
  resize?: "none" | "vertical" | "both";
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  ref?: React.Ref<HTMLTextAreaElement>;
};

export const TextArea = ({
  className,
  containerClassName,
  containerStyle,
  rows = 3,
  autoResize = false,
  maxRows,
  resize = "none",
  style,
  ref,
  ...props
}: TextAreaProps) => {
  /* Mirrors styles.module.css: one row is --font-size-md (14px) ×
     --line-height-md (1.5) = 21px, and the vertical padding is --size-6 top
     and bottom. */
  const rowHeight = 21;
  const padding = 12;
  const minHeight = autoResize ? rows * rowHeight + padding : style?.minHeight;
  const maxHeight =
    autoResize && maxRows != null
      ? maxRows * rowHeight + padding
      : style?.maxHeight;

  return (
    <div
      className={cx(styles.container, containerClassName)}
      style={containerStyle}
    >
      <textarea
        {...props}
        ref={ref}
        rows={autoResize ? undefined : rows}
        data-auto-resize={autoResize || undefined}
        data-resize={resize}
        className={cx(styles.textarea, className)}
        style={{ ...style, minHeight, maxHeight }}
      />
    </div>
  );
};
