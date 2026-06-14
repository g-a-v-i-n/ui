import React from "react";
import { ContextMenu as ContextMenuPrimitive } from "radix-ui";
import { MenuContainer, MenuDivider, MenuItem } from "../menu-primitives";
import { SFSymbol } from "../sf-symbol";

export const ContextMenuRoot = ContextMenuPrimitive.Root;
export const ContextMenuPortal = ContextMenuPrimitive.Portal;
export const ContextMenuTrigger = (
  props: ContextMenuPrimitive.ContextMenuTriggerProps
) => <ContextMenuPrimitive.Trigger asChild {...props} />;

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

export const ContextMenuItem = ({
  children,
  suffixSlot,
  prefixSlot,
  ref,
  ...props
}: {
  children: React.ReactNode;
  suffixSlot?: React.ReactNode;
  prefixSlot?: React.ReactNode;
} & ContextMenuPrimitive.ContextMenuItemProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <ContextMenuPrimitive.Item {...props} ref={ref} asChild>
      <MenuItem suffixSlot={suffixSlot} prefixSlot={prefixSlot}>
        {children}
      </MenuItem>
    </ContextMenuPrimitive.Item>
  );
};

export const ContextMenuSeparator = ({
  ref,
  ...props
}: ContextMenuPrimitive.ContextMenuSeparatorProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <ContextMenuPrimitive.Separator {...props} ref={ref} asChild>
      <MenuDivider />
    </ContextMenuPrimitive.Separator>
  );
};

export const ContextMenuSub = ContextMenuPrimitive.Sub;
export const ContextMenuSubTrigger = ({
  children,
  suffixSlot,
  prefixSlot,
  ref,
  ...props
}: {
  children: React.ReactNode;
  suffixSlot?: React.ReactNode;
  prefixSlot?: React.ReactNode;
} & ContextMenuPrimitive.ContextMenuSubTriggerProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <ContextMenuPrimitive.SubTrigger {...props} ref={ref} asChild>
      <MenuItem
        suffixSlot={suffixSlot ?? <SFSymbol symbol="􀆊" size="xs" weight="semibold" />}
        prefixSlot={prefixSlot}
      >
        {children}
      </MenuItem>
    </ContextMenuPrimitive.SubTrigger>
  );
};

export const ContextMenuSubContent = ({ children, ref, ...props }: ContextMenuPrimitive.ContextMenuSubContentProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <ContextMenuPrimitive.SubContent {...props} ref={ref} asChild>
      <MenuContainer>{children}</MenuContainer>
    </ContextMenuPrimitive.SubContent>
  );
};
