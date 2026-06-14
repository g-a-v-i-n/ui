import React from "react";
import styles from "./styles.module.css";

type TextInputProps = Omit<React.ComponentPropsWithoutRef<"input">, "width"> & {
  prefixSlot?: React.ReactNode;
  suffixSlot?: React.ReactNode;
  width?: "fill" | "hug" | number;
  variant?: "default" | "toolbar";
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  ref?: React.Ref<HTMLInputElement>;
};

export const TextInput = ({
  className = "",
  prefixSlot,
  suffixSlot,
  variant = "default",
  width = "hug",
  containerClassName = "",
  containerStyle,
  type = "text",
  ref,
  ...props
}: TextInputProps) => {
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
      <input
        {...props}
        ref={ref}
        type={type}
        className={`${styles.input} ${className}`}
      />
      {suffixSlot && <div className={styles.suffix}>{suffixSlot}</div>}
    </div>
  );
};
