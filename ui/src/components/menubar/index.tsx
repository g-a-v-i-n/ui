import { Menubar as MenubarPrimitive } from "radix-ui";
import { Text } from "../text";
import { MenuContainer } from "../menu-primitives";
import { createMenuParts } from "../menu-primitives/create-menu-parts";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import { styled } from "../../lib/styled";
import type { PropsOf } from "../../lib/props";

export type MenubarMenuProps = MenubarPrimitive.MenubarMenuProps;

export const MenubarMenu = (props: MenubarMenuProps) => (
  <MenubarPrimitive.Menu {...props} />
);
export const MenubarPortal = MenubarPrimitive.Portal;
export type MenubarPortalProps = PropsOf<typeof MenubarPortal>;
export const MenubarSub = MenubarPrimitive.Sub;
export type MenubarSubProps = PropsOf<typeof MenubarSub>;

const parts = createMenuParts(MenubarPrimitive);
export const MenubarItem = parts.Item;
export type MenubarItemProps = PropsOf<typeof MenubarItem>;
export const MenubarCheckboxItem = parts.CheckboxItem;
export type MenubarCheckboxItemProps = PropsOf<typeof MenubarCheckboxItem>;
export const MenubarRadioGroup = parts.RadioGroup;
export type MenubarRadioGroupProps = PropsOf<typeof MenubarRadioGroup>;
export const MenubarRadioItem = parts.RadioItem;
export type MenubarRadioItemProps = PropsOf<typeof MenubarRadioItem>;
export const MenubarGroup = parts.Group;
export type MenubarGroupProps = PropsOf<typeof MenubarGroup>;
export const MenubarLabel = parts.Label;
export type MenubarLabelProps = PropsOf<typeof MenubarLabel>;
export const MenubarSubTrigger = parts.SubTrigger;
export type MenubarSubTriggerProps = PropsOf<typeof MenubarSubTrigger>;
export const MenubarSeparator = parts.Separator;
export type MenubarSeparatorProps = PropsOf<typeof MenubarSeparator>;

export const MenubarRoot = styled(MenubarPrimitive.Root, styles.root, "MenubarRoot");
export type MenubarRootProps = PropsOf<typeof MenubarRoot>;

export type MenubarTriggerProps = PropsOf<typeof MenubarPrimitive.Trigger>;

export const MenubarTrigger = ({ children, className, asChild, ref, ...props }: MenubarTriggerProps) => {
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

export type MenubarContentProps = PropsOf<typeof MenubarPrimitive.Content> & {
  width?: "sm" | "md" | "lg" | "auto";
};

export const MenubarContent = ({
  children,
  className,
  sideOffset = 4,
  collisionPadding = 8,
  width,
  ref,
  ...props
}: MenubarContentProps) => {
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

export type MenubarSubContentProps = PropsOf<typeof MenubarPrimitive.SubContent> & {
  width?: "sm" | "md" | "lg" | "auto";
};

export const MenubarSubContent = ({
  children,
  className,
  alignOffset = -5,
  width,
  ref,
  ...props
}: MenubarSubContentProps) => {
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
