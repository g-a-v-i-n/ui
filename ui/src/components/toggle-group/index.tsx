import React, { Children, type Ref } from "react";
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";
import { motion } from "motion/react";
import { Text } from "../text";
import styles from "./styles.module.css";

/* The active item renders the highlight pill as a motion element with an
   instance-scoped layoutId, so it glides between items on change. */
const ToggleGroupContext = React.createContext<{
  value: string | undefined;
  baseId: string;
  highlightClassName: string;
}>({ value: undefined, baseId: "", highlightClassName: "" });

const transition = {
  duration: 0.18,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

type ToggleGroupProps = {
  highlightClassName?: string;
} & ToggleGroupPrimitive.ToggleGroupSingleProps;

export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    {
      className = "",
      highlightClassName = "",
      value,
      defaultValue,
      onValueChange,
      children,
      ...props
    },
    forwardedRef
  ) => {
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
        ref={forwardedRef}
        className={`${styles.root} ${className}`}
      >
        <ToggleGroupContext.Provider
          value={{ value: currentValue, baseId, highlightClassName }}
        >
          {children}
        </ToggleGroupContext.Provider>
      </ToggleGroupPrimitive.Root>
    );
  }
);

ToggleGroup.displayName = "ToggleGroup";

export const ToggleGroupItem = React.forwardRef(
  (
    {
      className = "",
      children,
      value,
      ...props
    }: ToggleGroupPrimitive.ToggleGroupItemProps,
    forwardedRef: Ref<HTMLButtonElement> | undefined
  ) => {
    const ctx = React.useContext(ToggleGroupContext);
    const isActive = value !== "" && ctx.value === value;

    return (
      <ToggleGroupPrimitive.Item
        {...props}
        value={value}
        ref={forwardedRef}
        className={`${styles.item} ${className}`}
      >
        {isActive && (
          <motion.span
            layoutId={`${ctx.baseId}-highlight`}
            transition={transition}
            className={`${styles.highlight} ${ctx.highlightClassName}`}
          />
        )}
        <span className={styles.content}>
          {Children.map(children, (child) =>
            typeof child === "string" || typeof child === "number" ? (
              <Text as="span" size="sm" weight="medium">
                {child}
              </Text>
            ) : (
              child
            )
          )}
        </span>
      </ToggleGroupPrimitive.Item>
    );
  }
);

ToggleGroupItem.displayName = "ToggleGroupItem";
