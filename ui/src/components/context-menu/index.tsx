import React from "react";
import { ContextMenu as ContextMenuPrimitive } from "radix-ui";
import { MenuContainer } from "../menu-primitives";
import { createMenuParts } from "../menu-primitives/create-menu-parts";

export const ContextMenuRoot = ContextMenuPrimitive.Root;
export const ContextMenuPortal = ContextMenuPrimitive.Portal;
export const ContextMenuTrigger = (
  props: ContextMenuPrimitive.ContextMenuTriggerProps
) => <ContextMenuPrimitive.Trigger asChild {...props} />;
export const ContextMenuSub = ContextMenuPrimitive.Sub;

const parts = createMenuParts(ContextMenuPrimitive);
export const ContextMenuItem = parts.Item;
export const ContextMenuCheckboxItem = parts.CheckboxItem;
export const ContextMenuRadioGroup = parts.RadioGroup;
export const ContextMenuRadioItem = parts.RadioItem;
export const ContextMenuGroup = parts.Group;
export const ContextMenuLabel = parts.Label;
export const ContextMenuSubTrigger = parts.SubTrigger;
export const ContextMenuSeparator = parts.Separator;

export const ContextMenuContent = ({
  children,
  ref,
  ...props
}: ContextMenuPrimitive.ContextMenuContentProps & {
  children: React.ReactNode;
} & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        data-side={"bottom"}
        {...props}
        ref={ref}
        asChild
      >
        <MenuContainer>{children}</MenuContainer>
      </ContextMenuPrimitive.Content>
    </ContextMenuPrimitive.Portal>
  );
};

export const ContextMenuSubContent = ({ children, ref, ...props }: ContextMenuPrimitive.ContextMenuSubContentProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <ContextMenuPrimitive.SubContent {...props} ref={ref} asChild>
      <MenuContainer>{children}</MenuContainer>
    </ContextMenuPrimitive.SubContent>
  );
};
