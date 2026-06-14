import React from "react";
import { Slider as SliderPrimitive } from "radix-ui";
import styles from "./styles.module.css";

export const Slider = ({ className = "", ref, ...props }: SliderPrimitive.SliderProps & { ref?: React.Ref<HTMLSpanElement> }) => {
  const thumbCount = (props.value ?? props.defaultValue ?? [0]).length;

  return (
    <SliderPrimitive.Root
      {...props}
      ref={ref}
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
};
