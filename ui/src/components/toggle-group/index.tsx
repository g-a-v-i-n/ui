import React from "react";
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";
import { motion } from "motion/react";
import styles from "./styles.module.css";
import { wrapTextChildren } from "../text/wrap";
import { cx } from "../../lib/cx";
import type { PropsOf } from "../../lib/props";

/* The active item renders the highlight pill as a motion element with an
   instance-scoped layoutId, so it glides between items on change. */
const ToggleGroupContext = React.createContext<{
  value: string | undefined;
  baseId: string;
  highlightClassName: string;
}>({ value: undefined, baseId: "", highlightClassName: "" });

const transition = {
  duration: 0.1,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

export type ToggleGroupProps = {
  highlightClassName?: string;
  /** Fully rounded (pill) shape for the group, items, and highlight. */
  round?: boolean;
} & Extract<
  /* Root's props are a single | multiple union; this group is single-select. */
  PropsOf<typeof ToggleGroupPrimitive.Root>,
  { type: "single" }
>;

export const ToggleGroup = ({
  className,
  highlightClassName = "",
  round = false,
  value,
  defaultValue,
  onValueChange,
  children,
  ref,
  ...props
}: ToggleGroupProps) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const baseId = React.useId();

  const currentValue = value ?? internalValue;
  const handleValueChange = (next: string) => {
    setInternalValue(next);
    onValueChange?.(next);
  };

  return (
    <ToggleGroupPrimitive.Root
      {...props}
      value={value}
      defaultValue={defaultValue}
      onValueChange={handleValueChange}
      ref={ref}
      data-round={round ? "" : undefined}
      className={cx(styles.root, className)}
    >
      <ToggleGroupContext.Provider
        value={{ value: currentValue, baseId, highlightClassName }}
      >
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
};

export type ToggleGroupItemProps = PropsOf<typeof ToggleGroupPrimitive.Item>;

export const ToggleGroupItem = ({
  className,
  children,
  value,
  ref,
  ...props
}: ToggleGroupItemProps) => {
  const ctx = React.useContext(ToggleGroupContext);
  const isActive = value !== "" && ctx.value === value;

  return (
    <ToggleGroupPrimitive.Item
      {...props}
      value={value}
      ref={ref}
      className={cx(styles.item, className)}
    >
      {isActive && (
        <motion.span
          layoutId={`${ctx.baseId}-highlight`}
          transition={transition}
          className={cx(styles.highlight, ctx.highlightClassName)}
        />
      )}
      <span className={styles.content}>
        {wrapTextChildren(children)}
      </span>
    </ToggleGroupPrimitive.Item>
  );
};
