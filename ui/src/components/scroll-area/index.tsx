import React from "react";
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";
import styles from "./styles.module.css";

export const ScrollAreaCorner = ScrollAreaPrimitive.Corner;

export const ScrollAreaRoot = ({ className = "", ref, ...props }: ScrollAreaPrimitive.ScrollAreaProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <ScrollAreaPrimitive.Root
      {...props}
      ref={ref}
      className={`${styles.root} ${className}`}
    />
  );
};

export const ScrollAreaViewport = ({ className = "", ref, ...props }: ScrollAreaPrimitive.ScrollAreaViewportProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <ScrollAreaPrimitive.Viewport
      {...props}
      ref={ref}
      className={`${styles.viewport} ${className}`}
    />
  );
};

export const ScrollAreaScrollbar = ({
  className = "",
  ref,
  ...props
}: ScrollAreaPrimitive.ScrollAreaScrollbarProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <ScrollAreaPrimitive.Scrollbar
      {...props}
      ref={ref}
      className={`${styles.scrollbar} ${className}`}
    />
  );
};

export const ScrollAreaThumb = ({ className = "", ref, ...props }: ScrollAreaPrimitive.ScrollAreaThumbProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <ScrollAreaPrimitive.Thumb
      {...props}
      ref={ref}
      className={`${styles.thumb} ${className}`}
    />
  );
};

export const ScrollArea = ({
  children,
  className = "",
  viewportClassName = "",
  ...props
}: ScrollAreaPrimitive.ScrollAreaProps & {
  viewportClassName?: string;
}) => {
  return (
    <ScrollAreaRoot className={className} {...props}>
      <ScrollAreaViewport className={viewportClassName}>
        {children}
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="vertical">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaScrollbar orientation="horizontal">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollAreaRoot>
  );
};
