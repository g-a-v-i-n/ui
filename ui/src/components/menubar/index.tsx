import React, { type Ref } from "react";
import { Menubar as MenubarPrimitive } from "radix-ui";
import { Text } from "../text";
import { SFSymbol } from "../sf-symbol";
import {
  MenuContainer,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuLabel,
} from "../menu-primitives";
import styles from "./styles.module.css";

export const MenubarMenu = (props: MenubarPrimitive.MenubarMenuProps) => (
  <MenubarPrimitive.Menu {...props} />
);
export const MenubarPortal = MenubarPrimitive.Portal;
export const MenubarSub = MenubarPrimitive.Sub;

export const MenubarRoot = React.forwardRef(
  (
    { className = "", ...props }: MenubarPrimitive.MenubarProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <MenubarPrimitive.Root
        {...props}
        ref={forwardedRef}
        className={`${styles.root} ${className}`}
      />
    );
  }
);

MenubarRoot.displayName = "MenubarRoot";

export const MenubarTrigger = React.forwardRef(
  (
    { children, className = "", ...props }: MenubarPrimitive.MenubarTriggerProps,
    forwardedRef: Ref<HTMLButtonElement> | undefined
  ) => {
    return (
      <MenubarPrimitive.Trigger
        {...props}
        ref={forwardedRef}
        className={`${styles.trigger} ${className}`}
      >
        <Text as="span" size="sm" weight="medium" color="inherit">
          {children}
        </Text>
      </MenubarPrimitive.Trigger>
    );
  }
);

MenubarTrigger.displayName = "MenubarTrigger";

export const MenubarContent = React.forwardRef(
  (
    {
      children,
      className = "",
      sideOffset = 4,
      collisionPadding = 8,
      width,
      ...props
    }: MenubarPrimitive.MenubarContentProps & {
      width?: "sm" | "md" | "lg" | "auto";
    },
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <MenubarPrimitive.Portal>
        <MenubarPrimitive.Content
          sideOffset={sideOffset}
          collisionPadding={collisionPadding}
          {...props}
          ref={forwardedRef}
          asChild
        >
          <MenuContainer
            width={width}
            className={`${styles.animation} ${className}`}
          >
            {children}
          </MenuContainer>
        </MenubarPrimitive.Content>
      </MenubarPrimitive.Portal>
    );
  }
);

MenubarContent.displayName = "MenubarContent";

export const MenubarSubContent = React.forwardRef(
  (
    {
      children,
      className = "",
      alignOffset = -5,
      width,
      ...props
    }: MenubarPrimitive.MenubarSubContentProps & {
      width?: "sm" | "md" | "lg" | "auto";
    },
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <MenubarPrimitive.Portal>
        <MenubarPrimitive.SubContent
          sideOffset={2}
          alignOffset={alignOffset}
          {...props}
          ref={forwardedRef}
          asChild
        >
          <MenuContainer
            width={width}
            className={`${styles.animation} ${className}`}
          >
            {children}
          </MenuContainer>
        </MenubarPrimitive.SubContent>
      </MenubarPrimitive.Portal>
    );
  }
);

MenubarSubContent.displayName = "MenubarSubContent";

export const MenubarItem = React.forwardRef(
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
    } & MenubarPrimitive.MenubarItemProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <MenubarPrimitive.Item {...props} ref={forwardedRef} asChild>
        <MenuItem suffixSlot={suffixSlot} prefixSlot={prefixSlot}>
          {children}
        </MenuItem>
      </MenubarPrimitive.Item>
    );
  }
);

MenubarItem.displayName = "MenubarItem";

export const MenubarCheckboxItem = React.forwardRef(
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
    } & MenubarPrimitive.MenubarCheckboxItemProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <MenubarPrimitive.CheckboxItem {...props} ref={forwardedRef} asChild>
        <MenuItem
          prefixSlot={
            <>
              <MenubarPrimitive.ItemIndicator asChild>
                <SFSymbol symbol="✓" data-check />
              </MenubarPrimitive.ItemIndicator>
              {prefixSlot ?? null}
            </>
          }
          suffixSlot={suffixSlot ?? null}
        >
          {children}
        </MenuItem>
      </MenubarPrimitive.CheckboxItem>
    );
  }
);

MenubarCheckboxItem.displayName = "MenubarCheckboxItem";

export const MenubarRadioGroup = React.forwardRef(
  (
    { children, ...props }: MenubarPrimitive.MenubarRadioGroupProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <MenubarPrimitive.RadioGroup {...props} ref={forwardedRef} asChild>
        <MenuGroup>{children}</MenuGroup>
      </MenubarPrimitive.RadioGroup>
    );
  }
);

MenubarRadioGroup.displayName = "MenubarRadioGroup";

export const MenubarRadioItem = React.forwardRef(
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
    } & MenubarPrimitive.MenubarRadioItemProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <MenubarPrimitive.RadioItem {...props} ref={forwardedRef} asChild>
        <MenuItem
          prefixSlot={
            <>
              <MenubarPrimitive.ItemIndicator asChild>
                <SFSymbol symbol="✓" data-check />
              </MenubarPrimitive.ItemIndicator>
              {prefixSlot ?? null}
            </>
          }
          suffixSlot={suffixSlot ?? null}
        >
          {children}
        </MenuItem>
      </MenubarPrimitive.RadioItem>
    );
  }
);

MenubarRadioItem.displayName = "MenubarRadioItem";

export const MenubarSubTrigger = React.forwardRef(
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
    } & MenubarPrimitive.MenubarSubTriggerProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <MenubarPrimitive.SubTrigger {...props} ref={forwardedRef} asChild>
        <MenuItem
          suffixSlot={suffixSlot ?? <SFSymbol symbol="􀆈" style={{ transform: "rotate(-90deg)" }} />}
          prefixSlot={prefixSlot}
        >
          {children}
        </MenuItem>
      </MenubarPrimitive.SubTrigger>
    );
  }
);

MenubarSubTrigger.displayName = "MenubarSubTrigger";

export const MenubarLabel = React.forwardRef(
  (
    { children, ...props }: MenubarPrimitive.MenubarLabelProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <MenubarPrimitive.Label {...props} ref={forwardedRef} asChild>
        <MenuLabel>{children}</MenuLabel>
      </MenubarPrimitive.Label>
    );
  }
);

MenubarLabel.displayName = "MenubarLabel";

export const MenubarGroup = React.forwardRef(
  (
    { children, ...props }: MenubarPrimitive.MenubarGroupProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <MenubarPrimitive.Group {...props} ref={forwardedRef} asChild>
        <MenuGroup>{children}</MenuGroup>
      </MenubarPrimitive.Group>
    );
  }
);

MenubarGroup.displayName = "MenubarGroup";

export const MenubarSeparator = React.forwardRef(
  (
    props: MenubarPrimitive.MenubarSeparatorProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <MenubarPrimitive.Separator {...props} ref={forwardedRef} asChild>
        <MenuDivider />
      </MenubarPrimitive.Separator>
    );
  }
);

MenubarSeparator.displayName = "MenubarSeparator";
