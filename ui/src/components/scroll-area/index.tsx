import React from "react";
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";
import styles from "./styles.module.css";
import { styled } from "../../lib/styled";

export const ScrollAreaCorner = ScrollAreaPrimitive.Corner;

export const ScrollAreaRoot = styled(ScrollAreaPrimitive.Root, styles.root, "ScrollAreaRoot");
export const ScrollAreaViewport = styled(
  ScrollAreaPrimitive.Viewport,
  styles.viewport,
  "ScrollAreaViewport"
);
export const ScrollAreaScrollbar = styled(
  ScrollAreaPrimitive.Scrollbar,
  styles.scrollbar,
  "ScrollAreaScrollbar"
);
export const ScrollAreaThumb = styled(ScrollAreaPrimitive.Thumb, styles.thumb, "ScrollAreaThumb");

export const ScrollArea = ({
  children,
  className,
  viewportClassName,
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
