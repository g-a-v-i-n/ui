import React, { type Ref } from "react";
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";
import styles from "./styles.module.css";

export const ScrollAreaCorner = ScrollAreaPrimitive.Corner;

export const ScrollAreaRoot = React.forwardRef(
  (
    { className = "", ...props }: ScrollAreaPrimitive.ScrollAreaProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <ScrollAreaPrimitive.Root
        {...props}
        ref={forwardedRef}
        className={`${styles.root} ${className}`}
      />
    );
  }
);

ScrollAreaRoot.displayName = "ScrollAreaRoot";

export const ScrollAreaViewport = React.forwardRef(
  (
    { className = "", ...props }: ScrollAreaPrimitive.ScrollAreaViewportProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <ScrollAreaPrimitive.Viewport
        {...props}
        ref={forwardedRef}
        className={`${styles.viewport} ${className}`}
      />
    );
  }
);

ScrollAreaViewport.displayName = "ScrollAreaViewport";

export const ScrollAreaScrollbar = React.forwardRef(
  (
    {
      className = "",
      ...props
    }: ScrollAreaPrimitive.ScrollAreaScrollbarProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <ScrollAreaPrimitive.Scrollbar
        {...props}
        ref={forwardedRef}
        className={`${styles.scrollbar} ${className}`}
      />
    );
  }
);

ScrollAreaScrollbar.displayName = "ScrollAreaScrollbar";

export const ScrollAreaThumb = React.forwardRef(
  (
    { className = "", ...props }: ScrollAreaPrimitive.ScrollAreaThumbProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <ScrollAreaPrimitive.Thumb
        {...props}
        ref={forwardedRef}
        className={`${styles.thumb} ${className}`}
      />
    );
  }
);

ScrollAreaThumb.displayName = "ScrollAreaThumb";

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

ScrollArea.displayName = "ScrollArea";
