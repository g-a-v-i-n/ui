import React from "react";
import { Slider as SliderPrimitive } from "radix-ui";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";

export const Slider = ({
  className,
  thumbLabels,
  ref,
  ...props
}: SliderPrimitive.SliderProps & {
  /** Accessible name per thumb, in value order. */
  thumbLabels?: string[];
  ref?: React.Ref<HTMLSpanElement>;
}) => {
  const thumbCount = (props.value ?? props.defaultValue ?? [0]).length;

  return (
    <SliderPrimitive.Root
      {...props}
      ref={ref}
      className={cx(styles.root, className)}
    >
      <SliderPrimitive.Track className={styles.track}>
        <SliderPrimitive.Range className={styles.range} />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbCount }, (_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          aria-label={thumbLabels?.[i]}
          className={styles.thumb}
        />
      ))}
    </SliderPrimitive.Root>
  );
};
