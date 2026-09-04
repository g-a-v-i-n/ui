import React from "react";
import { Select as SelectPrimitive } from "radix-ui";
import { Text } from "../text";
import { SFSymbol } from "../sf-symbol";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import { styled } from "../../lib/styled";

export const SelectRoot = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;
export const SelectGroup = SelectPrimitive.Group;

export const SelectTrigger = ({ children, className, asChild, ref, ...props }: SelectPrimitive.SelectTriggerProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  return (
    <SelectPrimitive.Trigger
      {...props}
      asChild={asChild}
      ref={ref}
      className={cx(styles.trigger, className)}
    >
      {asChild ? (
        children
      ) : (
        <>
          <Text as="span" size="sm" weight="medium">
            {children}
          </Text>
          <SelectPrimitive.Icon className={styles.triggerIcon}>
            <SFSymbol symbol="􀆈" size="sm" />
          </SelectPrimitive.Icon>
        </>
      )}
    </SelectPrimitive.Trigger>
  );
};

export const SelectScrollUpButton = ({
  className,
  ref,
  ...props
}: SelectPrimitive.SelectScrollUpButtonProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <SelectPrimitive.ScrollUpButton
      {...props}
      ref={ref}
      className={cx(styles.scrollButton, styles.scrollButtonUp, className)}
    >
      <SFSymbol symbol="􀆈" size="sm" />
    </SelectPrimitive.ScrollUpButton>
  );
};

export const SelectScrollDownButton = ({
  className,
  ref,
  ...props
}: SelectPrimitive.SelectScrollDownButtonProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <SelectPrimitive.ScrollDownButton
      {...props}
      ref={ref}
      className={cx(styles.scrollButton, className)}
    >
      <SFSymbol symbol="􀆈" size="sm" />
    </SelectPrimitive.ScrollDownButton>
  );
};

export const SelectContent = ({
  children,
  className,
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
        className={cx(styles.content, className)}
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

// No asChild: the item owns its ItemIndicator/ItemText markup, which Select
// needs to mirror the chosen label into the trigger.
export const SelectItem = ({ children, className, ref, ...props }: Omit<SelectPrimitive.SelectItemProps, "asChild"> & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <SelectPrimitive.Item
      {...props}
      ref={ref}
      className={cx(styles.item, className)}
    >
      <SelectPrimitive.ItemIndicator className={styles.indicator}>
        <SFSymbol symbol="✓" size="sm" />
      </SelectPrimitive.ItemIndicator>
      <Text as="span" size="sm">
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </Text>
    </SelectPrimitive.Item>
  );
};

export const SelectLabel = ({ children, className, asChild, ref, ...props }: SelectPrimitive.SelectLabelProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <SelectPrimitive.Label
      {...props}
      asChild={asChild}
      ref={ref}
      className={cx(styles.label, className)}
    >
      {asChild ? (
        children
      ) : (
        <Text as="span" size="xs" weight="medium" color="tertiary">
          {children}
        </Text>
      )}
    </SelectPrimitive.Label>
  );
};

export const SelectSeparator = styled(SelectPrimitive.Separator, styles.separator, "SelectSeparator");
