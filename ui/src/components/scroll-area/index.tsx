import React from "react";
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";
import styles from "./styles.module.css";
import { styled } from "../../lib/styled";
import type { PropsOf } from "../../lib/props";

export const ScrollAreaCorner = ScrollAreaPrimitive.Corner;
export type ScrollAreaCornerProps = PropsOf<typeof ScrollAreaCorner>;

export const ScrollAreaRoot = styled(ScrollAreaPrimitive.Root, styles.root, "ScrollAreaRoot");
export type ScrollAreaRootProps = PropsOf<typeof ScrollAreaRoot>;
export const ScrollAreaViewport = styled(
  ScrollAreaPrimitive.Viewport,
  styles.viewport,
  "ScrollAreaViewport"
);
export type ScrollAreaViewportProps = PropsOf<typeof ScrollAreaViewport>;
export const ScrollAreaScrollbar = styled(
  ScrollAreaPrimitive.Scrollbar,
  styles.scrollbar,
  "ScrollAreaScrollbar"
);
export type ScrollAreaScrollbarProps = PropsOf<typeof ScrollAreaScrollbar>;
export const ScrollAreaThumb = styled(ScrollAreaPrimitive.Thumb, styles.thumb, "ScrollAreaThumb");
export type ScrollAreaThumbProps = PropsOf<typeof ScrollAreaThumb>;

export type ScrollAreaProps = ScrollAreaPrimitive.ScrollAreaProps & {
  viewportClassName?: string;
};

export const ScrollArea = ({
  children,
  className,
  viewportClassName,
  ...props
}: ScrollAreaProps) => {
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
