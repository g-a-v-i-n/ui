import React from "react";
import { Popover as PopoverPrimitive } from "radix-ui";

import { MenuArrow } from "../menu-primitives";
import { POPOVER_OFFSET } from "../../offsets";
import styles from "./styles.module.css";

export const PopoverRoot = PopoverPrimitive.Root;
export const PopoverPortal = PopoverPrimitive.Portal;
export const PopoverAnchor = PopoverPrimitive.Anchor;
export const PopoverClose = PopoverPrimitive.Close;

export const PopoverTrigger = (props: PopoverPrimitive.PopoverTriggerProps) => (
  <PopoverPrimitive.Trigger asChild {...props} />
);

export const PopoverArrow = ({
  ref,
  ...props
}: PopoverPrimitive.PopoverArrowProps & { ref?: React.Ref<SVGSVGElement> }) => {
  return (
    <PopoverPrimitive.Arrow asChild {...props} ref={ref}>
      <MenuArrow />
    </PopoverPrimitive.Arrow>
  );
};

export const PopoverContent = ({
  children,
  className = "",
  sideOffset = POPOVER_OFFSET,
  collisionPadding = 12,
  ref,
  ...props
}: PopoverPrimitive.PopoverContentProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        arrowPadding={6}
        {...props}
        ref={ref}
        className={`${styles.content} ${className}`}
      >
        {children}
        <PopoverArrow />
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
};
