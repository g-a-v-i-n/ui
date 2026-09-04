import React from "react";
import { Menubar as MenubarPrimitive } from "radix-ui";
import { Text } from "../text";
import { MenuContainer } from "../menu-primitives";
import { createMenuParts } from "../menu-primitives/create-menu-parts";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import { styled } from "../../lib/styled";

export const MenubarMenu = (props: MenubarPrimitive.MenubarMenuProps) => (
  <MenubarPrimitive.Menu {...props} />
);
export const MenubarPortal = MenubarPrimitive.Portal;
export const MenubarSub = MenubarPrimitive.Sub;

const parts = createMenuParts(MenubarPrimitive);
export const MenubarItem = parts.Item;
export const MenubarCheckboxItem = parts.CheckboxItem;
export const MenubarRadioGroup = parts.RadioGroup;
export const MenubarRadioItem = parts.RadioItem;
export const MenubarGroup = parts.Group;
export const MenubarLabel = parts.Label;
export const MenubarSubTrigger = parts.SubTrigger;
export const MenubarSeparator = parts.Separator;

export const MenubarRoot = styled(MenubarPrimitive.Root, styles.root, "MenubarRoot");

export const MenubarTrigger = ({ children, className, asChild, ref, ...props }: MenubarPrimitive.MenubarTriggerProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  return (
    <MenubarPrimitive.Trigger
      {...props}
      asChild={asChild}
      ref={ref}
      className={cx(styles.trigger, className)}
    >
      {asChild ? (
        children
      ) : (
        <Text as="span" size="sm" weight="medium" color="inherit">
          {children}
        </Text>
      )}
    </MenubarPrimitive.Trigger>
  );
};

export const MenubarContent = ({
  children,
  className,
  sideOffset = 4,
  collisionPadding = 8,
  width,
  ref,
  ...props
}: MenubarPrimitive.MenubarContentProps & {
  width?: "sm" | "md" | "lg" | "auto";
} & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
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
      </MenubarPrimitive.Content>
    </MenubarPrimitive.Portal>
  );
};

export const MenubarSubContent = ({
  children,
  className,
  alignOffset = -5,
  width,
  ref,
  ...props
}: MenubarPrimitive.MenubarSubContentProps & {
  width?: "sm" | "md" | "lg" | "auto";
} & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.SubContent
        sideOffset={2}
        alignOffset={alignOffset}
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
      </MenubarPrimitive.SubContent>
    </MenubarPrimitive.Portal>
  );
};
