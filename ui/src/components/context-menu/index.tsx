import React from "react";
import { ContextMenu as ContextMenuPrimitive } from "radix-ui";
import { MenuContainer } from "../menu-primitives";
import { createMenuParts } from "../menu-primitives/create-menu-parts";
import type { PropsOf } from "../../lib/props";

export const ContextMenuRoot = ContextMenuPrimitive.Root;
export type ContextMenuRootProps = PropsOf<typeof ContextMenuRoot>;
export const ContextMenuPortal = ContextMenuPrimitive.Portal;
export type ContextMenuPortalProps = PropsOf<typeof ContextMenuPortal>;
export type ContextMenuTriggerProps = PropsOf<typeof ContextMenuPrimitive.Trigger>;
export const ContextMenuTrigger = (
  props: ContextMenuTriggerProps
) => <ContextMenuPrimitive.Trigger asChild {...props} />;
export const ContextMenuSub = ContextMenuPrimitive.Sub;
export type ContextMenuSubProps = PropsOf<typeof ContextMenuSub>;

const parts = createMenuParts(ContextMenuPrimitive);
export const ContextMenuItem = parts.Item;
export type ContextMenuItemProps = PropsOf<typeof ContextMenuItem>;
export const ContextMenuCheckboxItem = parts.CheckboxItem;
export type ContextMenuCheckboxItemProps = PropsOf<typeof ContextMenuCheckboxItem>;
export const ContextMenuRadioGroup = parts.RadioGroup;
export type ContextMenuRadioGroupProps = PropsOf<typeof ContextMenuRadioGroup>;
export const ContextMenuRadioItem = parts.RadioItem;
export type ContextMenuRadioItemProps = PropsOf<typeof ContextMenuRadioItem>;
export const ContextMenuGroup = parts.Group;
export type ContextMenuGroupProps = PropsOf<typeof ContextMenuGroup>;
export const ContextMenuLabel = parts.Label;
export type ContextMenuLabelProps = PropsOf<typeof ContextMenuLabel>;
export const ContextMenuSubTrigger = parts.SubTrigger;
export type ContextMenuSubTriggerProps = PropsOf<typeof ContextMenuSubTrigger>;
export const ContextMenuSeparator = parts.Separator;
export type ContextMenuSeparatorProps = PropsOf<typeof ContextMenuSeparator>;

export type ContextMenuContentProps = PropsOf<typeof ContextMenuPrimitive.Content> & {
  children: React.ReactNode;
};

export const ContextMenuContent = ({
  children,
  ref,
  ...props
}: ContextMenuContentProps) => {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        {...props}
        ref={ref}
        asChild
      >
        <MenuContainer>{children}</MenuContainer>
      </ContextMenuPrimitive.Content>
    </ContextMenuPrimitive.Portal>
  );
};

export type ContextMenuSubContentProps = PropsOf<typeof ContextMenuPrimitive.SubContent>;

export const ContextMenuSubContent = ({ children, ref, ...props }: ContextMenuSubContentProps) => {
  return (
    <ContextMenuPrimitive.SubContent {...props} ref={ref} asChild>
      <MenuContainer>{children}</MenuContainer>
    </ContextMenuPrimitive.SubContent>
  );
};
