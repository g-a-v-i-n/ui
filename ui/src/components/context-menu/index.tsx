import React, { type Ref } from "react";
import { ContextMenu as ContextMenuPrimitive } from "radix-ui";
import { MenuContainer, MenuDivider, MenuItem } from "../menu-primitives";

export const ContextMenuRoot = ContextMenuPrimitive.Root;
export const ContextMenuPortal = ContextMenuPrimitive.Portal;
export const ContextMenuTrigger = (
  props: ContextMenuPrimitive.ContextMenuTriggerProps
) => <ContextMenuPrimitive.Trigger asChild {...props} />;

export const ContextMenuContent = React.forwardRef(
  (
    {
      children,
      ...props
    }: ContextMenuPrimitive.ContextMenuContentProps & {
      children: React.ReactNode;
    },
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <ContextMenuPrimitive.Portal>
        <ContextMenuPrimitive.Content
          data-side={"bottom"}
          {...props}
          ref={forwardedRef}
          asChild
        >
          <MenuContainer>{children}</MenuContainer>
        </ContextMenuPrimitive.Content>
      </ContextMenuPrimitive.Portal>
    );
  }
);

ContextMenuContent.displayName = "ContextMenuContent";

export const ContextMenuItem = React.forwardRef(
  (
    {
      children,
      suffixSlot,
      prefixSlot,
      ...props
    }: {
      children: React.ReactNode;
      suffixSlot?: React.ReactNode;
      prefixSlot?: React.ReactNode;
    } & ContextMenuPrimitive.ContextMenuItemProps,
    forwardedRef: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <ContextMenuPrimitive.Item {...props} ref={forwardedRef} asChild>
        <MenuItem suffixSlot={suffixSlot} prefixSlot={prefixSlot}>
          {children}
        </MenuItem>
      </ContextMenuPrimitive.Item>
    );
  }
);

ContextMenuItem.displayName = "ContextMenuItem";

export const ContextMenuSeparator = React.forwardRef(
  ({ ...props }, forwardedRef: React.ForwardedRef<HTMLDivElement>) => {
    return (
      <ContextMenuPrimitive.Separator {...props} ref={forwardedRef} asChild>
        <MenuDivider />
      </ContextMenuPrimitive.Separator>
    );
  }
);

ContextMenuSeparator.displayName = "ContextMenuSeparator";

export const ContextMenuSub = ContextMenuPrimitive.Sub;
ContextMenuSub.displayName = "ContextMenuSub";
export const ContextMenuSubTrigger = React.forwardRef(
  (
    {
      children,
      suffixSlot,
      prefixSlot,
      ...props
    }: {
      children: React.ReactNode;
      suffixSlot?: React.ReactNode;
      prefixSlot?: React.ReactNode;
    } & ContextMenuPrimitive.ContextMenuSubTriggerProps,
    forwardedRef: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <ContextMenuPrimitive.SubTrigger {...props} ref={forwardedRef} asChild>
        <MenuItem suffixSlot={suffixSlot} prefixSlot={prefixSlot}>
          {children}
        </MenuItem>
      </ContextMenuPrimitive.SubTrigger>
    );
  }
);

ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger";

export const ContextMenuSubContent = React.forwardRef(
  (
    { children, ...props }: ContextMenuPrimitive.ContextMenuSubContentProps,
    forwardedRef: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <ContextMenuPrimitive.SubContent {...props} ref={forwardedRef} asChild>
        <MenuContainer>{children}</MenuContainer>
      </ContextMenuPrimitive.SubContent>
    );
  }
);

ContextMenuSubContent.displayName = "ContextMenuSubContent";
