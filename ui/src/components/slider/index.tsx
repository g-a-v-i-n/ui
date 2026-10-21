import React from "react";
import { Slider as SliderPrimitive } from "radix-ui";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import type { PropsOf } from "../../lib/props";

export type SliderProps = PropsOf<typeof SliderPrimitive.Root> & {
  /** Accessible name per thumb, in value order. */
  thumbLabels?: string[];
  /**
   * The slider's default, one entry per thumb. Besides seeding an
   * uncontrolled slider it is marked on the track with a 1px tick, and
   * double-clicking a thumb snaps it back to it. Works with `value` too.
   */
  defaultValue?: number[];
};

// Where Radix puts a thumb's center for a value, as a distance from the
// track's start edge: the raw percentage, pulled inward by up to half the
// thumb so the thumb stays inside the track at either end. Ticks use the
// same formula so they sit exactly under the thumb at that value.
const thumbCenter = (percent: number) =>
  `calc(${percent}% + ${(50 - percent) / 100} * var(--thumb-size))`;

export const Slider = ({
  className,
  thumbLabels,
  value: valueProp,
  defaultValue,
  onValueChange,
  onValueCommit,
  min = 0,
  max = 100,
  orientation = "horizontal",
  inverted = false,
  dir,
  ref,
  ...props
}: SliderProps) => {
  // Held here rather than left to Radix so a double-click can reset one thumb
  // of an uncontrolled slider without knowing the others.
  const [uncontrolled, setUncontrolled] = React.useState<number[]>(
    () => defaultValue ?? [min],
  );
  const value = valueProp ?? uncontrolled;

  const handleChange = (next: number[]) => {
    if (valueProp === undefined) setUncontrolled(next);
    onValueChange?.(next);
  };

  const resetThumb = (index: number) => {
    const target = defaultValue?.[index];
    if (target === undefined || value[index] === target) return;
    const next = value.slice();
    next[index] = target;
    handleChange(next);
    onValueCommit?.(next);
  };

  const horizontal = orientation === "horizontal";
  const fromStart = horizontal
    ? (dir !== "rtl" && !inverted) || (dir === "rtl" && inverted)
    : !inverted;
  const edge = horizontal
    ? fromStart
      ? "left"
      : "right"
    : fromStart
      ? "bottom"
      : "top";

  return (
    <SliderPrimitive.Root
      {...props}
      ref={ref}
      value={value}
      onValueChange={handleChange}
      onValueCommit={onValueCommit}
      min={min}
      max={max}
      orientation={orientation}
      inverted={inverted}
      dir={dir}
      className={cx(styles.root, className)}
    >
      <SliderPrimitive.Track className={styles.track}>
        <SliderPrimitive.Range className={styles.range} />
        {defaultValue?.map((v, i) => {
          const percent = max === min ? 0 : ((v - min) / (max - min)) * 100;
          return (
            <span
              key={i}
              aria-hidden="true"
              className={styles.tick}
              data-orientation={orientation}
              data-edge={edge}
              style={{ [edge]: thumbCenter(percent) }}
            />
          );
        })}
      </SliderPrimitive.Track>
      {value.map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          aria-label={thumbLabels?.[i]}
          className={styles.thumb}
          onDoubleClick={() => resetThumb(i)}
        />
      ))}
    </SliderPrimitive.Root>
  );
};
