import { Popover as PopoverPrimitive } from "radix-ui";

import { MenuArrow } from "../menu-primitives";
import { POPOVER_OFFSET } from "../../offsets";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import type { PropsOf } from "../../lib/props";

export const PopoverRoot = PopoverPrimitive.Root;
export type PopoverRootProps = PropsOf<typeof PopoverRoot>;
export const PopoverPortal = PopoverPrimitive.Portal;
export type PopoverPortalProps = PropsOf<typeof PopoverPortal>;
export const PopoverAnchor = PopoverPrimitive.Anchor;
export type PopoverAnchorProps = PropsOf<typeof PopoverAnchor>;
export const PopoverClose = PopoverPrimitive.Close;
export type PopoverCloseProps = PropsOf<typeof PopoverClose>;

export type PopoverTriggerProps = PropsOf<typeof PopoverPrimitive.Trigger>;

export const PopoverTrigger = ({ ref, ...props }: PopoverTriggerProps) => (
  <PopoverPrimitive.Trigger asChild {...props} ref={ref} />
);

export type PopoverArrowProps = PropsOf<typeof PopoverPrimitive.Arrow>;

export const PopoverArrow = ({ ref, ...props }: PopoverArrowProps) => {
  return (
    <PopoverPrimitive.Arrow asChild {...props} ref={ref}>
      <MenuArrow />
    </PopoverPrimitive.Arrow>
  );
};

export type PopoverContentProps = PropsOf<typeof PopoverPrimitive.Content>;

export const PopoverContent = ({
  children,
  className,
  sideOffset = POPOVER_OFFSET,
  collisionPadding = 12,
  ref,
  ...props
}: PopoverContentProps) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        arrowPadding={6}
        {...props}
        ref={ref}
        className={cx(styles.content, className)}
      >
        {children}
        <PopoverArrow />
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
};
