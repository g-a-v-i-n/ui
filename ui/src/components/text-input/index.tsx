import React from "react";
import AutosizeInput from "react-input-autosize";
import styles from "./styles.module.css";

type TextInputProps = Omit<React.ComponentPropsWithoutRef<"input">, "width"> & {
  prefixSlot?: React.ReactNode;
  suffixSlot?: React.ReactNode;
  width?: "fill" | "hug" | number;
  variant?: "default" | "toolbar";
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
};

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className = "",
      prefixSlot,
      suffixSlot,
      variant = "default",
      width = "hug",
      containerClassName = "",
      containerStyle,
      type = "text",
      ...props
    },
    forwardedRef
  ) => {
    const widthMode = typeof width === "number" ? "number" : width;
    const numberStyle =
      typeof width === "number" ? { width: `${width}px` } : undefined;

    return (
      <div
        className={`${styles.container} ${containerClassName}`}
        data-variant={variant}
        data-width={widthMode}
        style={{ ...containerStyle, ...numberStyle }}
      >
        {prefixSlot && <div className={styles.prefix}>{prefixSlot}</div>}
        {widthMode === "hug" ? (
          <AutosizeInput
            inputRef={
              forwardedRef as (ref: HTMLInputElement | null) => void
            }
            type={type}
            inputClassName={`${styles.input} ${className}`}
            {...props}
          />
        ) : (
          <input
            {...props}
            ref={forwardedRef}
            type={type}
            className={`${styles.input} ${className}`}
          />
        )}
        {suffixSlot && <div className={styles.suffix}>{suffixSlot}</div>}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";
