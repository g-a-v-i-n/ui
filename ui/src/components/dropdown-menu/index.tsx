import React from "react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";

import { MenuArrow, MenuContainer } from "../menu-primitives";
import { createMenuParts } from "../menu-primitives/create-menu-parts";
import { POPOVER_OFFSET } from "../../offsets";

export const DropdownMenuRoot = DropdownMenuPrimitive.Root;
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
export const DropdownMenuTrigger = (
  props: DropdownMenuPrimitive.DropdownMenuTriggerProps
) => <DropdownMenuPrimitive.Trigger asChild {...props} />;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const parts = createMenuParts(DropdownMenuPrimitive);
export const DropdownMenuItem = parts.Item;
export const DropdownMenuCheckboxItem = parts.CheckboxItem;
export const DropdownMenuRadioGroup = parts.RadioGroup;
export const DropdownMenuRadioItem = parts.RadioItem;
export const DropdownMenuGroup = parts.Group;
export const DropdownMenuLabel = parts.Label;
export const DropdownMenuSubTrigger = parts.SubTrigger;
export const DropdownMenuSeparator = parts.Separator;

export type DropdownMenuCheckboxItemProps = React.ComponentProps<
  typeof DropdownMenuCheckboxItem
>;

export const DropdownMenuContent = ({
  children,
  collisionPadding = 8,
  sideOffset = POPOVER_OFFSET,
  className,
  width,
  ref,
  ...props
}: DropdownMenuPrimitive.DropdownMenuContentProps & {
  width?: "sm" | "md" | "lg" | "auto";
} & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        arrowPadding={6}
        {...props}
        ref={ref}
        asChild
      >
        <MenuContainer
          width={width}
          className={cx(styles.animation, className)}
        >
          {children}
        </MenuContainer>
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
};

export const DropdownMenuArrow = ({ ref, ...props }: DropdownMenuPrimitive.DropdownMenuArrowProps & { ref?: React.Ref<SVGSVGElement> }) => {
  return (
    <DropdownMenuPrimitive.Arrow asChild {...props} ref={ref}>
      <MenuArrow />
    </DropdownMenuPrimitive.Arrow>
  );
};

export const DropdownMenuSubContent = ({
  children,
  width,
  className,
  ref,
  ...props
}: DropdownMenuPrimitive.DropdownMenuSubContentProps & {
  width?: "sm" | "md" | "lg" | "auto";
} & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.SubContent
        sideOffset={2}
        alignOffset={-3}
        {...props}
        ref={ref}
        asChild
      >
        <MenuContainer
          width={width}
          className={cx(styles.animation, className)}
        >
          {children}
        </MenuContainer>
      </DropdownMenuPrimitive.SubContent>
    </DropdownMenuPrimitive.Portal>
  );
};
