import React from "react";
import styles from "./styles.module.css";

export type GradientMaskProps = {
  direction?: "top" | "bottom" | "left" | "right";
  /** Thickness of the fade strip in px. */
  size?: number;
  /** Blur radius in px; defaults to size / 4 so the fade completes inside the strip. */
  blur?: number;
  /** The color faded to — should match the scroll container's background. */
  color?: string;
} & React.HTMLAttributes<HTMLDivElement>;

/* Fades out the edge of a scroll container. Position the nearest ancestor
   (the non-scrolling wrapper, not the scroller itself) relative. The fade is
   a solid color-matched div feathered with a gaussian blur and clipped by the
   strip, rather than a CSS gradient. */
export const GradientMask = ({
  direction = "top",
  size = 24,
  blur,
  color = "var(--bg-primary)",
  className = "",
  style,
  ref,
  ...props
}: GradientMaskProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <div
      {...props}
      ref={ref}
      aria-hidden="true"
      data-direction={direction}
      className={`${styles.mask} ${className}`}
      style={
        {
          "--mask-size": `${size}px`,
          "--mask-blur": `${blur ?? size / 4}px`,
          "--mask-color": color,
          ...style,
        } as React.CSSProperties
      }
    >
      <div className={styles.blur} />
    </div>
  );
};
