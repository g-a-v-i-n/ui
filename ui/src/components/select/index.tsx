import React from "react";
import { Select as SelectPrimitive } from "radix-ui";
import { Text } from "../text";
import { SFSymbol } from "../sf-symbol";
import styles from "./styles.module.css";

export const SelectRoot = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;
export const SelectGroup = SelectPrimitive.Group;

export const SelectTrigger = ({ children, className = "", ref, ...props }: SelectPrimitive.SelectTriggerProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  return (
    <SelectPrimitive.Trigger
      {...props}
      ref={ref}
      className={`${styles.trigger} ${className}`}
    >
      {children}
      <SelectPrimitive.Icon className={styles.triggerIcon}>
        <SFSymbol symbol="􀆈" size="sm" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
};

export const SelectScrollUpButton = ({
  className = "",
  ref,
  ...props
}: SelectPrimitive.SelectScrollUpButtonProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <SelectPrimitive.ScrollUpButton
      {...props}
      ref={ref}
      className={`${styles.scrollButton} ${styles.scrollButtonUp} ${className}`}
    >
      <SFSymbol symbol="􀆈" size="sm" />
    </SelectPrimitive.ScrollUpButton>
  );
};

export const SelectScrollDownButton = ({
  className = "",
  ref,
  ...props
}: SelectPrimitive.SelectScrollDownButtonProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <SelectPrimitive.ScrollDownButton
      {...props}
      ref={ref}
      className={`${styles.scrollButton} ${styles.scrollButtonDown} ${className}`}
    >
      <SFSymbol symbol="􀆈" size="sm" />
    </SelectPrimitive.ScrollDownButton>
  );
};

export const SelectContent = ({
  children,
  className = "",
  position = "popper",
  sideOffset = 4,
  collisionPadding = 12,
  ref,
  ...props
}: SelectPrimitive.SelectContentProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position={position}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        {...props}
        ref={ref}
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
};

export const SelectItem = ({ children, className = "", ref, ...props }: SelectPrimitive.SelectItemProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <SelectPrimitive.Item
      {...props}
      ref={ref}
      className={`${styles.item} ${className}`}
    >
      <SelectPrimitive.ItemIndicator className={styles.indicator}>
        <SFSymbol symbol="✓" size="sm" />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
};

export const SelectLabel = ({ children, className = "", ref, ...props }: SelectPrimitive.SelectLabelProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <SelectPrimitive.Label
      {...props}
      ref={ref}
      className={`${styles.label} ${className}`}
    >
      <Text as="span" size="xs" weight="medium" color="tertiary">
        {children}
      </Text>
    </SelectPrimitive.Label>
  );
};

export const SelectSeparator = ({ className = "", ref, ...props }: SelectPrimitive.SelectSeparatorProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <SelectPrimitive.Separator
      {...props}
      ref={ref}
      className={`${styles.separator} ${className}`}
    />
  );
};
