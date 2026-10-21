import { Select as SelectPrimitive } from "radix-ui";
import { Text } from "../text";
import { CheckIcon } from "../icon/static/check";
import { ChevronDownIcon } from "../icon/static/chevron-down";
import { ChevronDownMiniBoldIcon } from "../icon/static/chevron-down-mini-bold";
import { ChevronUpIcon } from "../icon/static/chevron-up";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import { styled } from "../../lib/styled";
import type { PropsOf } from "../../lib/props";

export const SelectRoot = SelectPrimitive.Root;
export type SelectRootProps = PropsOf<typeof SelectRoot>;
export const SelectValue = SelectPrimitive.Value;
export type SelectValueProps = PropsOf<typeof SelectValue>;
export const SelectGroup = SelectPrimitive.Group;
export type SelectGroupProps = PropsOf<typeof SelectGroup>;

export type SelectTriggerProps = PropsOf<typeof SelectPrimitive.Trigger>;

export const SelectTrigger = ({ children, className, asChild, ref, ...props }: SelectTriggerProps) => {
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
            <ChevronDownMiniBoldIcon size="lg" />
          </SelectPrimitive.Icon>
        </>
      )}
    </SelectPrimitive.Trigger>
  );
};

export type SelectScrollUpButtonProps = PropsOf<typeof SelectPrimitive.ScrollUpButton>;

export const SelectScrollUpButton = ({
  className,
  ref,
  ...props
}: SelectScrollUpButtonProps) => {
  return (
    <SelectPrimitive.ScrollUpButton
      {...props}
      ref={ref}
      className={cx(styles.scrollButton, className)}
    >
      <ChevronUpIcon size="sm" />
    </SelectPrimitive.ScrollUpButton>
  );
};

export type SelectScrollDownButtonProps = PropsOf<typeof SelectPrimitive.ScrollDownButton>;

export const SelectScrollDownButton = ({
  className,
  ref,
  ...props
}: SelectScrollDownButtonProps) => {
  return (
    <SelectPrimitive.ScrollDownButton
      {...props}
      ref={ref}
      className={cx(styles.scrollButton, className)}
    >
      <ChevronDownIcon size="sm" />
    </SelectPrimitive.ScrollDownButton>
  );
};

export type SelectContentProps = PropsOf<typeof SelectPrimitive.Content>;

export const SelectContent = ({
  children,
  className,
  position = "popper",
  sideOffset = 4,
  collisionPadding = 12,
  ref,
  ...props
}: SelectContentProps) => {
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
export type SelectItemProps = Omit<PropsOf<typeof SelectPrimitive.Item>, "asChild">;

export const SelectItem = ({ children, className, ref, ...props }: SelectItemProps) => {
  return (
    <SelectPrimitive.Item
      {...props}
      ref={ref}
      className={cx(styles.item, className)}
    >
      <SelectPrimitive.ItemIndicator className={styles.indicator}>
        <CheckIcon size="sm" />
      </SelectPrimitive.ItemIndicator>
      <Text as="span" size="sm">
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </Text>
    </SelectPrimitive.Item>
  );
};

export type SelectLabelProps = PropsOf<typeof SelectPrimitive.Label>;

export const SelectLabel = ({ children, className, asChild, ref, ...props }: SelectLabelProps) => {
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
export type SelectSeparatorProps = PropsOf<typeof SelectSeparator>;
