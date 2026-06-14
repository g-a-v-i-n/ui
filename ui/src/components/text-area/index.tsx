import React from "react";
import styles from "./styles.module.css";

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
  className = "",
  containerClassName = "",
  containerStyle,
  rows = 3,
  autoResize = false,
  maxRows,
  resize = "none",
  ref,
  ...props
}: TextAreaProps) => {
  /* line-height 1.5 at 15px ≈ 22.5px per row, plus 10px vertical padding. */
  const rowHeight = 22.5;
  const padding = 20;

  return (
    <div
      className={`${styles.container} ${containerClassName}`}
      style={containerStyle}
    >
      <textarea
        {...props}
        ref={ref}
        rows={autoResize ? undefined : rows}
        data-auto-resize={autoResize || undefined}
        data-resize={resize}
        className={`${styles.textarea} ${className}`}
        style={{
          minHeight: autoResize ? rows * rowHeight + padding : undefined,
          maxHeight:
            autoResize && maxRows != null
              ? maxRows * rowHeight + padding
              : undefined,
        }}
      />
    </div>
  );
};
