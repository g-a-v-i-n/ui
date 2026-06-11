import React, { type Ref } from "react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import styles from "./styles.module.css";
import { Arrow } from "../arrow";
import { SFSymbol } from "../sf-symbol";
import { MenuContainer, MenuGroup, MenuItem, MenuLabel } from "../menu-primitives";

export const DropdownMenuRoot = DropdownMenuPrimitive.Root;
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
export const DropdownMenuTrigger = (
  props: DropdownMenuPrimitive.DropdownMenuTriggerProps
) => <DropdownMenuPrimitive.Trigger asChild {...props} />;
export const DropdownMenuSeparator = DropdownMenuPrimitive.Separator;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;

export const DropdownMenuContent = React.forwardRef(
  (
    {
      children,
      collisionPadding = 8,
      className = "",
      width,
      ...props
    }: DropdownMenuPrimitive.DropdownMenuContentProps & {
      width?: "sm" | "md" | "lg" | "auto";
    },
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          sideOffset={-4}
          collisionPadding={collisionPadding}
          arrowPadding={6}
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
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    );
  }
);

DropdownMenuContent.displayName = "DropdownMenuContent";

export const DropdownMenuArrow = React.forwardRef(
  (
    { ...props }: DropdownMenuPrimitive.DropdownMenuArrowProps,
    forwardedRef: Ref<SVGSVGElement> | undefined
  ) => {
    return (
      <DropdownMenuPrimitive.Arrow asChild {...props} ref={forwardedRef}>
        <Arrow />
      </DropdownMenuPrimitive.Arrow>
    );
  }
);

DropdownMenuArrow.displayName = "DropdownMenuArrow";

export const DropdownMenuLabel = React.forwardRef(
  (
    { children, ...props }: DropdownMenuPrimitive.DropdownMenuLabelProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <DropdownMenuPrimitive.Label
        {...props}
        className={styles.label}
        ref={forwardedRef}
        asChild
      >
        <MenuLabel>{children}</MenuLabel>
      </DropdownMenuPrimitive.Label>
    );
  }
);

DropdownMenuLabel.displayName = "DropdownMenuLabel";

export const DropdownMenuItem = React.forwardRef(
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
    } & DropdownMenuPrimitive.DropdownMenuItemProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <DropdownMenuPrimitive.Item {...props} ref={forwardedRef} asChild>
        <MenuItem suffixSlot={suffixSlot} prefixSlot={prefixSlot}>
          {children}
        </MenuItem>
      </DropdownMenuPrimitive.Item>
    );
  }
);

DropdownMenuItem.displayName = "DropdownMenuItem";

export const DropdownMenuGroup = React.forwardRef(
  (
    { children, ...props }: DropdownMenuPrimitive.DropdownMenuGroupProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <DropdownMenuPrimitive.Group {...props} ref={forwardedRef} asChild>
        <MenuGroup>{children}</MenuGroup>
      </DropdownMenuPrimitive.Group>
    );
  }
);

DropdownMenuGroup.displayName = "DropdownMenuGroup";

export type DropdownMenuCheckboxItemProps =
  DropdownMenuPrimitive.DropdownMenuCheckboxItemProps & {
    prefixSlot?: React.ReactNode;
    suffixSlot?: React.ReactNode;
    children: React.ReactNode;
  };

export const DropdownMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuCheckboxItemProps
>(({ children, prefixSlot, suffixSlot, ...props }, forwardedRef) => {
  return (
    <DropdownMenuPrimitive.CheckboxItem ref={forwardedRef} {...props} asChild>
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
});

DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

export const DropdownMenuRadioGroup = React.forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.DropdownMenuRadioGroupProps
>(({ children, ...props }, forwardedRef) => {
  return (
    <DropdownMenuPrimitive.RadioGroup {...props} ref={forwardedRef} asChild>
      <MenuGroup>{children}</MenuGroup>
    </DropdownMenuPrimitive.RadioGroup>
  );
});

DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup";

export const DropdownMenuRadioItem = React.forwardRef(
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
    } & DropdownMenuPrimitive.DropdownMenuRadioItemProps,
    forwardedRef: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <DropdownMenuPrimitive.RadioItem {...props} ref={forwardedRef} asChild>
        <MenuItem suffixSlot={suffixSlot} prefixSlot={prefixSlot}>
          {children}
        </MenuItem>
      </DropdownMenuPrimitive.RadioItem>
    );
  }
);

DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

export const DropdownMenuSubTrigger = React.forwardRef(
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
    } & DropdownMenuPrimitive.DropdownMenuSubTriggerProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <DropdownMenuPrimitive.SubTrigger {...props} ref={forwardedRef} asChild>
        <MenuItem
          suffixSlot={suffixSlot ?? <SFSymbol symbol="􀆈" style={{ transform: "rotate(-90deg)" }} />}
          prefixSlot={prefixSlot}
        >
          {children}
        </MenuItem>
      </DropdownMenuPrimitive.SubTrigger>
    );
  }
);

DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

export const DropdownMenuSubContent = React.forwardRef(
  (
    {
      children,
      width,
      className = "",
      ...props
    }: DropdownMenuPrimitive.DropdownMenuSubContentProps & {
      width?: "sm" | "md" | "lg" | "auto";
    },
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.SubContent
          sideOffset={2}
          alignOffset={-5}
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
        </DropdownMenuPrimitive.SubContent>
      </DropdownMenuPrimitive.Portal>
    );
  }
);

DropdownMenuSubContent.displayName = "DropdownMenuSubContent";
