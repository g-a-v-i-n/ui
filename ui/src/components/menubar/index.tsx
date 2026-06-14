import React from "react";
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

export const MenubarRoot = ({ className = "", ref, ...props }: MenubarPrimitive.MenubarProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <MenubarPrimitive.Root
      {...props}
      ref={ref}
      className={`${styles.root} ${className}`}
    />
  );
};

export const MenubarTrigger = ({ children, className = "", ref, ...props }: MenubarPrimitive.MenubarTriggerProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  return (
    <MenubarPrimitive.Trigger
      {...props}
      ref={ref}
      className={`${styles.trigger} ${className}`}
    >
      <Text as="span" size="sm" weight="medium" color="inherit">
        {children}
      </Text>
    </MenubarPrimitive.Trigger>
  );
};

export const MenubarContent = ({
  children,
  className = "",
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
          className={`${styles.animation} ${className}`}
        >
          {children}
        </MenuContainer>
      </MenubarPrimitive.Content>
    </MenubarPrimitive.Portal>
  );
};

export const MenubarSubContent = ({
  children,
  className = "",
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
          className={`${styles.animation} ${className}`}
        >
          {children}
        </MenuContainer>
      </MenubarPrimitive.SubContent>
    </MenubarPrimitive.Portal>
  );
};

export const MenubarItem = ({
  children,
  suffixSlot,
  prefixSlot,
  ref,
  ...props
}: {
  children: React.ReactNode;
  suffixSlot?: React.ReactNode;
  prefixSlot?: React.ReactNode;
} & MenubarPrimitive.MenubarItemProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <MenubarPrimitive.Item {...props} ref={ref} asChild>
      <MenuItem suffixSlot={suffixSlot} prefixSlot={prefixSlot}>
        {children}
      </MenuItem>
    </MenubarPrimitive.Item>
  );
};

export const MenubarCheckboxItem = ({
  children,
  suffixSlot,
  prefixSlot,
  ref,
  ...props
}: {
  children: React.ReactNode;
  suffixSlot?: React.ReactNode;
  prefixSlot?: React.ReactNode;
} & MenubarPrimitive.MenubarCheckboxItemProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <MenubarPrimitive.CheckboxItem {...props} ref={ref} asChild>
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
};

export const MenubarRadioGroup = ({ children, ref, ...props }: MenubarPrimitive.MenubarRadioGroupProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <MenubarPrimitive.RadioGroup {...props} ref={ref} asChild>
      <MenuGroup>{children}</MenuGroup>
    </MenubarPrimitive.RadioGroup>
  );
};

export const MenubarRadioItem = ({
  children,
  suffixSlot,
  prefixSlot,
  ref,
  ...props
}: {
  children: React.ReactNode;
  suffixSlot?: React.ReactNode;
  prefixSlot?: React.ReactNode;
} & MenubarPrimitive.MenubarRadioItemProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <MenubarPrimitive.RadioItem {...props} ref={ref} asChild>
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
};

export const MenubarSubTrigger = ({
  children,
  suffixSlot,
  prefixSlot,
  ref,
  ...props
}: {
  children: React.ReactNode;
  suffixSlot?: React.ReactNode;
  prefixSlot?: React.ReactNode;
} & MenubarPrimitive.MenubarSubTriggerProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <MenubarPrimitive.SubTrigger {...props} ref={ref} asChild>
      <MenuItem
        suffixSlot={suffixSlot ?? <SFSymbol symbol="􀆈" style={{ transform: "rotate(-90deg)" }} />}
        prefixSlot={prefixSlot}
      >
        {children}
      </MenuItem>
    </MenubarPrimitive.SubTrigger>
  );
};

export const MenubarLabel = ({ children, ref, ...props }: MenubarPrimitive.MenubarLabelProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <MenubarPrimitive.Label {...props} ref={ref} asChild>
      <MenuLabel>{children}</MenuLabel>
    </MenubarPrimitive.Label>
  );
};

export const MenubarGroup = ({ children, ref, ...props }: MenubarPrimitive.MenubarGroupProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <MenubarPrimitive.Group {...props} ref={ref} asChild>
      <MenuGroup>{children}</MenuGroup>
    </MenubarPrimitive.Group>
  );
};

export const MenubarSeparator = ({
  ref,
  ...props
}: MenubarPrimitive.MenubarSeparatorProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <MenubarPrimitive.Separator {...props} ref={ref} asChild>
      <MenuDivider />
    </MenubarPrimitive.Separator>
  );
};
