import React, { type Ref } from "react";
import { Slider as SliderPrimitive } from "radix-ui";
import styles from "./styles.module.css";

export const Slider = React.forwardRef(
  (
    { className = "", ...props }: SliderPrimitive.SliderProps,
    forwardedRef: Ref<HTMLSpanElement> | undefined
  ) => {
    const thumbCount = (props.value ?? props.defaultValue ?? [0]).length;

    return (
      <SliderPrimitive.Root
        {...props}
        ref={forwardedRef}
        className={`${styles.root} ${className}`}
      >
        <SliderPrimitive.Track className={styles.track}>
          <SliderPrimitive.Range className={styles.range} />
        </SliderPrimitive.Track>
        {Array.from({ length: thumbCount }, (_, i) => (
          <SliderPrimitive.Thumb key={i} className={styles.thumb} />
        ))}
      </SliderPrimitive.Root>
    );
  }
);

Slider.displayName = "Slider";
