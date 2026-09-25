import React from "react";
import { Icon } from "../icon";
import { MenuDivider, MenuGroup, MenuItem, MenuLabel } from "./index";
import styles from "./styles.module.css";

/** Extra slots every menu part layers on top of its radix primitive props. */
export type MenuSlotProps = {
  children?: React.ReactNode;
  suffixSlot?: React.ReactNode;
  prefixSlot?: React.ReactNode;
};

function splitSlots<P>(props: P & MenuSlotProps) {
  const { children, suffixSlot, prefixSlot, ...rest } = props;
  return {
    slots: { children, suffixSlot, prefixSlot } satisfies MenuSlotProps,
    // SAFETY: rest is exactly P with the slot keys removed; the slot keys are
    // layered on by MenuSlotProps rather than coming from P, so rest still
    // satisfies P.
    rest: rest as P,
  };
}

/**
 * Build the menu parts whose implementations are identical across the
 * dropdown-menu, context-menu, and menubar primitives — each wraps its radix
 * part around the shared menu-primitives styling via asChild. Parts that
 * genuinely differ per menu (Root, Trigger, Content, SubContent) stay in the
 * individual components.
 */
export function createMenuParts<
  ItemP extends { asChild?: boolean },
  CheckboxItemP extends { asChild?: boolean },
  RadioGroupP extends { asChild?: boolean },
  RadioItemP extends { asChild?: boolean },
  GroupP extends { asChild?: boolean },
  LabelP extends { asChild?: boolean },
  SubTriggerP extends { asChild?: boolean },
  SeparatorP extends { asChild?: boolean },
>(primitive: {
  Item: React.ComponentType<ItemP>;
  CheckboxItem: React.ComponentType<CheckboxItemP>;
  RadioGroup: React.ComponentType<RadioGroupP>;
  RadioItem: React.ComponentType<RadioItemP>;
  Group: React.ComponentType<GroupP>;
  Label: React.ComponentType<LabelP>;
  SubTrigger: React.ComponentType<SubTriggerP>;
  Separator: React.ComponentType<SeparatorP>;
  ItemIndicator: React.ComponentType<{ asChild?: boolean; children?: React.ReactNode }>;
}) {
  const Item = (props: ItemP & MenuSlotProps) => {
    const { slots, rest } = splitSlots(props);
    return (
      <primitive.Item {...rest} asChild>
        <MenuItem suffixSlot={slots.suffixSlot} prefixSlot={slots.prefixSlot}>
          {slots.children}
        </MenuItem>
      </primitive.Item>
    );
  };

  /* Checkbox and radio items share the check-indicator prefix; the shared
     .checkboxItem class keeps unchecked rows aligned with checked ones. */
  const indicatorItem = (slots: MenuSlotProps) => (
    <MenuItem
      className={styles.checkboxItem}
      prefixSlot={
        <>
          <primitive.ItemIndicator asChild>
            <Icon icon="check" size="md" data-check />
          </primitive.ItemIndicator>
          {slots.prefixSlot ?? null}
        </>
      }
      suffixSlot={slots.suffixSlot ?? null}
    >
      {slots.children}
    </MenuItem>
  );

  const CheckboxItem = (props: CheckboxItemP & MenuSlotProps) => {
    const { slots, rest } = splitSlots(props);
    return (
      <primitive.CheckboxItem {...rest} asChild>
        {indicatorItem(slots)}
      </primitive.CheckboxItem>
    );
  };

  const RadioItem = (props: RadioItemP & MenuSlotProps) => {
    const { slots, rest } = splitSlots(props);
    return (
      <primitive.RadioItem {...rest} asChild>
        {indicatorItem(slots)}
      </primitive.RadioItem>
    );
  };

  const RadioGroup = (props: RadioGroupP & { children?: React.ReactNode }) => {
    const { slots, rest } = splitSlots(props);
    return (
      <primitive.RadioGroup {...rest} asChild>
        <MenuGroup>{slots.children}</MenuGroup>
      </primitive.RadioGroup>
    );
  };

  const Group = (props: GroupP & { children?: React.ReactNode }) => {
    const { slots, rest } = splitSlots(props);
    return (
      <primitive.Group {...rest} asChild>
        <MenuGroup>{slots.children}</MenuGroup>
      </primitive.Group>
    );
  };

  const Label = (props: LabelP & { children?: React.ReactNode }) => {
    const { slots, rest } = splitSlots(props);
    return (
      <primitive.Label {...rest} asChild>
        <MenuLabel>{slots.children}</MenuLabel>
      </primitive.Label>
    );
  };

  const SubTrigger = (props: SubTriggerP & MenuSlotProps) => {
    const { slots, rest } = splitSlots(props);
    return (
      <primitive.SubTrigger {...rest} asChild>
        <MenuItem
          suffixSlot={
            slots.suffixSlot ?? <Icon icon="chevron-right" size="xs" />
          }
          prefixSlot={slots.prefixSlot}
        >
          {slots.children}
        </MenuItem>
      </primitive.SubTrigger>
    );
  };

  const Separator = (props: SeparatorP) => {
    return (
      <primitive.Separator {...props} asChild>
        <MenuDivider />
      </primitive.Separator>
    );
  };

  return { Item, CheckboxItem, RadioGroup, RadioItem, Group, Label, SubTrigger, Separator };
}
