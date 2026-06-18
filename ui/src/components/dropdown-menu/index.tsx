import React from "react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import styles from "./styles.module.css";

import { SFSymbol } from "../sf-symbol";
import { MenuArrow, MenuContainer, MenuGroup, MenuItem, MenuLabel } from "../menu-primitives";
import { POPOVER_OFFSET } from "../../offsets";

export const DropdownMenuRoot = DropdownMenuPrimitive.Root;
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
export const DropdownMenuTrigger = (
  props: DropdownMenuPrimitive.DropdownMenuTriggerProps
) => <DropdownMenuPrimitive.Trigger asChild {...props} />;
export const DropdownMenuSeparator = DropdownMenuPrimitive.Separator;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;

export const DropdownMenuContent = ({
  children,
  collisionPadding = 8,
  sideOffset = POPOVER_OFFSET,
  className = "",
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
          className={`${styles.animation} ${className}`}
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

export const DropdownMenuLabel = ({ children, ref, ...props }: DropdownMenuPrimitive.DropdownMenuLabelProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <DropdownMenuPrimitive.Label
      {...props}
      className={styles.label}
      ref={ref}
      asChild
    >
      <MenuLabel>{children}</MenuLabel>
    </DropdownMenuPrimitive.Label>
  );
};

export const DropdownMenuItem = ({
  children,
  suffixSlot,
  prefixSlot,
  ref,
  ...props
}: {
  children: React.ReactNode;
  suffixSlot?: React.ReactNode;
  prefixSlot?: React.ReactNode;
} & DropdownMenuPrimitive.DropdownMenuItemProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <DropdownMenuPrimitive.Item {...props} ref={ref} asChild>
      <MenuItem suffixSlot={suffixSlot} prefixSlot={prefixSlot}>
        {children}
      </MenuItem>
    </DropdownMenuPrimitive.Item>
  );
};

export const DropdownMenuGroup = ({ children, ref, ...props }: DropdownMenuPrimitive.DropdownMenuGroupProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <DropdownMenuPrimitive.Group {...props} ref={ref} asChild>
      <MenuGroup>{children}</MenuGroup>
    </DropdownMenuPrimitive.Group>
  );
};

export type DropdownMenuCheckboxItemProps =
  DropdownMenuPrimitive.DropdownMenuCheckboxItemProps & {
    prefixSlot?: React.ReactNode;
    suffixSlot?: React.ReactNode;
    children: React.ReactNode;
  };

export const DropdownMenuCheckboxItem = ({
  children,
  prefixSlot,
  suffixSlot,
  ref,
  ...props
}: DropdownMenuCheckboxItemProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <DropdownMenuPrimitive.CheckboxItem ref={ref} {...props} asChild>
      <MenuItem
        className={styles.checkboxItem}
        prefixSlot={
          <>
            <DropdownMenuPrimitive.ItemIndicator asChild>
              <SFSymbol symbol="✓" data-check />
            </DropdownMenuPrimitive.ItemIndicator>
            {prefixSlot ?? null}
          </>
        }
        suffixSlot={suffixSlot ?? null}
      >
        {children}
      </MenuItem>
    </DropdownMenuPrimitive.CheckboxItem>
  );
};

export const DropdownMenuRadioGroup = ({
  children,
  ref,
  ...props
}: DropdownMenuPrimitive.DropdownMenuRadioGroupProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <DropdownMenuPrimitive.RadioGroup {...props} ref={ref} asChild>
      <MenuGroup>{children}</MenuGroup>
    </DropdownMenuPrimitive.RadioGroup>
  );
};

export const DropdownMenuRadioItem = ({
  children,
  suffixSlot,
  prefixSlot,
  ref,
  ...props
}: {
  children: React.ReactNode;
  suffixSlot?: React.ReactNode;
  prefixSlot?: React.ReactNode;
} & DropdownMenuPrimitive.DropdownMenuRadioItemProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <DropdownMenuPrimitive.RadioItem {...props} ref={ref} asChild>
      <MenuItem suffixSlot={suffixSlot} prefixSlot={prefixSlot}>
        {children}
      </MenuItem>
    </DropdownMenuPrimitive.RadioItem>
  );
};

export const DropdownMenuSubTrigger = ({
  children,
  suffixSlot,
  prefixSlot,
  ref,
  ...props
}: {
  children: React.ReactNode;
  suffixSlot?: React.ReactNode;
  prefixSlot?: React.ReactNode;
} & DropdownMenuPrimitive.DropdownMenuSubTriggerProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <DropdownMenuPrimitive.SubTrigger {...props} ref={ref} asChild>
      <MenuItem
        suffixSlot={suffixSlot ?? <SFSymbol symbol="􀆊" size="xs" weight="semibold" />}
        prefixSlot={prefixSlot}
      >
        {children}
      </MenuItem>
    </DropdownMenuPrimitive.SubTrigger>
  );
};

export const DropdownMenuSubContent = ({
  children,
  width,
  className = "",
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
          className={`${styles.animation} ${className}`}
        >
          {children}
        </MenuContainer>
      </DropdownMenuPrimitive.SubContent>
    </DropdownMenuPrimitive.Portal>
  );
};
