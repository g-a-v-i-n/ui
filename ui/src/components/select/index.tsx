import React, { type Ref } from "react";
import { Select as SelectPrimitive } from "radix-ui";
import { Text } from "../text";
import { SFSymbol } from "../sf-symbol";
import styles from "./styles.module.css";

export const SelectRoot = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;
export const SelectGroup = SelectPrimitive.Group;

export const SelectTrigger = React.forwardRef(
  (
    { children, className = "", ...props }: SelectPrimitive.SelectTriggerProps,
    forwardedRef: Ref<HTMLButtonElement> | undefined
  ) => {
    return (
      <SelectPrimitive.Trigger
        {...props}
        ref={forwardedRef}
        className={`${styles.trigger} ${className}`}
      >
        {children}
        <SelectPrimitive.Icon className={styles.triggerIcon}>
          <SFSymbol symbol="􀆈" size="sm" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    );
  }
);

SelectTrigger.displayName = "SelectTrigger";

export const SelectScrollUpButton = React.forwardRef(
  (
    {
      className = "",
      ...props
    }: SelectPrimitive.SelectScrollUpButtonProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <SelectPrimitive.ScrollUpButton
        {...props}
        ref={forwardedRef}
        className={`${styles.scrollButton} ${styles.scrollButtonUp} ${className}`}
      >
        <SFSymbol symbol="􀆈" size="sm" />
      </SelectPrimitive.ScrollUpButton>
    );
  }
);

SelectScrollUpButton.displayName = "SelectScrollUpButton";

export const SelectScrollDownButton = React.forwardRef(
  (
    {
      className = "",
      ...props
    }: SelectPrimitive.SelectScrollDownButtonProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <SelectPrimitive.ScrollDownButton
        {...props}
        ref={forwardedRef}
        className={`${styles.scrollButton} ${styles.scrollButtonDown} ${className}`}
      >
        <SFSymbol symbol="􀆈" size="sm" />
      </SelectPrimitive.ScrollDownButton>
    );
  }
);

SelectScrollDownButton.displayName = "SelectScrollDownButton";

export const SelectContent = React.forwardRef(
  (
    {
      children,
      className = "",
      position = "popper",
      sideOffset = 4,
      collisionPadding = 12,
      ...props
    }: SelectPrimitive.SelectContentProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position={position}
          sideOffset={sideOffset}
          collisionPadding={collisionPadding}
          {...props}
          ref={forwardedRef}
          className={`${styles.content} ${className}`}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.Viewport className={styles.viewport}>
            {children}
          </SelectPrimitive.Viewport>
          <SelectScrollDownButton />
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    );
  }
);

SelectContent.displayName = "SelectContent";

export const SelectItem = React.forwardRef(
  (
    { children, className = "", ...props }: SelectPrimitive.SelectItemProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <SelectPrimitive.Item
        {...props}
        ref={forwardedRef}
        className={`${styles.item} ${className}`}
      >
        <SelectPrimitive.ItemIndicator className={styles.indicator}>
          <SFSymbol symbol="✓" size="sm" />
        </SelectPrimitive.ItemIndicator>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
    );
  }
);

SelectItem.displayName = "SelectItem";

export const SelectLabel = React.forwardRef(
  (
    { children, className = "", ...props }: SelectPrimitive.SelectLabelProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <SelectPrimitive.Label
        {...props}
        ref={forwardedRef}
        className={`${styles.label} ${className}`}
      >
        <Text as="span" size="xs" weight="medium" color="tertiary">
          {children}
        </Text>
      </SelectPrimitive.Label>
    );
  }
);

SelectLabel.displayName = "SelectLabel";

export const SelectSeparator = React.forwardRef(
  (
    { className = "", ...props }: SelectPrimitive.SelectSeparatorProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <SelectPrimitive.Separator
        {...props}
        ref={forwardedRef}
        className={`${styles.separator} ${className}`}
      />
    );
  }
);

SelectSeparator.displayName = "SelectSeparator";
