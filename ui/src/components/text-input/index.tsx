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

// Gap between a slot and the input text — matches --size-8.
const SLOT_GAP = 8;

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

  const containerRef = React.useRef<HTMLDivElement>(null);
  const prefixRef = React.useRef<HTMLDivElement>(null);
  const suffixRef = React.useRef<HTMLDivElement>(null);

  // The slots are absolutely positioned, so the input itself owns the padding
  // and the full click target. Reserve room for each slot by padding the input
  // by its measured width; a ResizeObserver keeps it correct as slot content
  // changes (icon → spinner, a Tag's label, etc.).
  React.useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sync = () => {
      const pw = prefixRef.current?.offsetWidth;
      const sw = suffixRef.current?.offsetWidth;
      container.style.setProperty("--prefix-w", pw ? `${pw + SLOT_GAP}px` : "");
      container.style.setProperty("--suffix-w", sw ? `${sw + SLOT_GAP}px` : "");
    };

    sync();
    const ro = new ResizeObserver(sync);
    if (prefixRef.current) ro.observe(prefixRef.current);
    if (suffixRef.current) ro.observe(suffixRef.current);
    return () => ro.disconnect();
  }, [prefixSlot, suffixSlot]);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${containerClassName}`}
      data-variant={variant}
      data-width={widthMode}
      style={{ ...containerStyle, ...numberStyle }}
    >
      {prefixSlot && (
        <div ref={prefixRef} className={styles.prefix}>
          {prefixSlot}
        </div>
      )}
      <input
        {...props}
        ref={ref}
        type={type}
        className={`${styles.input} ${className}`}
      />
      {suffixSlot && (
        <div ref={suffixRef} className={styles.suffix}>
          {suffixSlot}
        </div>
      )}
    </div>
  );
};
