import React, { type Ref } from "react";
import { Popover as PopoverPrimitive } from "radix-ui";
import { Arrow } from "../arrow";
import styles from "./styles.module.css";

export const PopoverRoot = PopoverPrimitive.Root;
export const PopoverPortal = PopoverPrimitive.Portal;
export const PopoverAnchor = PopoverPrimitive.Anchor;
export const PopoverClose = PopoverPrimitive.Close;

export const PopoverTrigger = (props: PopoverPrimitive.PopoverTriggerProps) => (
  <PopoverPrimitive.Trigger asChild {...props} />
);

export const PopoverArrow = React.forwardRef(
  (
    props: PopoverPrimitive.PopoverArrowProps,
    forwardedRef: Ref<SVGSVGElement> | undefined
  ) => {
    return (
      <PopoverPrimitive.Arrow asChild {...props} ref={forwardedRef}>
        <Arrow />
      </PopoverPrimitive.Arrow>
    );
  }
);

PopoverArrow.displayName = "PopoverArrow";

export const PopoverContent = React.forwardRef(
  (
    {
      children,
      className = "",
      sideOffset = 8,
      collisionPadding = 12,
      ...props
    }: PopoverPrimitive.PopoverContentProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          sideOffset={sideOffset}
          collisionPadding={collisionPadding}
          arrowPadding={6}
          {...props}
          ref={forwardedRef}
          className={`${styles.content} ${className}`}
        >
          {children}
          <PopoverArrow />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    );
  }
);

PopoverContent.displayName = "PopoverContent";
