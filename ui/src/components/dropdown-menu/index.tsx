import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";

import { MenuArrow, MenuContainer } from "../menu-primitives";
import { createMenuParts } from "../menu-primitives/create-menu-parts";
import { MENU_OFFSET } from "../../offsets";
import type { PropsOf } from "../../lib/props";

export const DropdownMenuRoot = DropdownMenuPrimitive.Root;
export type DropdownMenuRootProps = PropsOf<typeof DropdownMenuRoot>;
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
export type DropdownMenuPortalProps = PropsOf<typeof DropdownMenuPortal>;
export type DropdownMenuTriggerProps = PropsOf<typeof DropdownMenuPrimitive.Trigger>;
export const DropdownMenuTrigger = (
  props: DropdownMenuTriggerProps
) => <DropdownMenuPrimitive.Trigger asChild {...props} />;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export type DropdownMenuSubProps = PropsOf<typeof DropdownMenuSub>;

const parts = createMenuParts(DropdownMenuPrimitive);
export const DropdownMenuItem = parts.Item;
export type DropdownMenuItemProps = PropsOf<typeof DropdownMenuItem>;
export const DropdownMenuCheckboxItem = parts.CheckboxItem;
export type DropdownMenuCheckboxItemProps = PropsOf<typeof DropdownMenuCheckboxItem>;
export const DropdownMenuRadioGroup = parts.RadioGroup;
export type DropdownMenuRadioGroupProps = PropsOf<typeof DropdownMenuRadioGroup>;
export const DropdownMenuRadioItem = parts.RadioItem;
export type DropdownMenuRadioItemProps = PropsOf<typeof DropdownMenuRadioItem>;
export const DropdownMenuGroup = parts.Group;
export type DropdownMenuGroupProps = PropsOf<typeof DropdownMenuGroup>;
export const DropdownMenuLabel = parts.Label;
export type DropdownMenuLabelProps = PropsOf<typeof DropdownMenuLabel>;
export const DropdownMenuSubTrigger = parts.SubTrigger;
export type DropdownMenuSubTriggerProps = PropsOf<typeof DropdownMenuSubTrigger>;
export const DropdownMenuSeparator = parts.Separator;
export type DropdownMenuSeparatorProps = PropsOf<typeof DropdownMenuSeparator>;

export type DropdownMenuContentProps = PropsOf<typeof DropdownMenuPrimitive.Content> & {
  width?: "sm" | "md" | "lg" | "auto";
};

export const DropdownMenuContent = ({
  children,
  collisionPadding = 8,
  sideOffset = MENU_OFFSET,
  className,
  width,
  ref,
  ...props
}: DropdownMenuContentProps) => {
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
        <MenuContainer width={width} className={className}>
          {children}
        </MenuContainer>
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
};

export type DropdownMenuArrowProps = PropsOf<typeof DropdownMenuPrimitive.Arrow>;

export const DropdownMenuArrow = ({ ref, ...props }: DropdownMenuArrowProps) => {
  return (
    <DropdownMenuPrimitive.Arrow asChild {...props} ref={ref}>
      <MenuArrow />
    </DropdownMenuPrimitive.Arrow>
  );
};

export type DropdownMenuSubContentProps = PropsOf<typeof DropdownMenuPrimitive.SubContent> & {
  width?: "sm" | "md" | "lg" | "auto";
};

export const DropdownMenuSubContent = ({
  children,
  width,
  className,
  ref,
  ...props
}: DropdownMenuSubContentProps) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.SubContent
        sideOffset={2}
        alignOffset={-3}
        {...props}
        ref={ref}
        asChild
      >
        <MenuContainer width={width} className={className}>
          {children}
        </MenuContainer>
      </DropdownMenuPrimitive.SubContent>
    </DropdownMenuPrimitive.Portal>
  );
};
