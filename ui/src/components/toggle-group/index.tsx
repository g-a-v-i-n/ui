import React, { Children } from "react";
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

export const ToggleGroup = ({
  className = "",
  highlightClassName = "",
  value,
  defaultValue,
  onValueChange,
  children,
  ref,
  ...props
}: ToggleGroupProps & { ref?: React.Ref<HTMLDivElement> }) => {
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
      className={`${styles.root} ${className}`}
    >
      <ToggleGroupContext.Provider
        value={{ value: currentValue, baseId, highlightClassName }}
      >
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
};

export const ToggleGroupItem = ({
  className = "",
  children,
  value,
  ref,
  ...props
}: ToggleGroupPrimitive.ToggleGroupItemProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  const ctx = React.useContext(ToggleGroupContext);
  const isActive = value !== "" && ctx.value === value;

  return (
    <ToggleGroupPrimitive.Item
      {...props}
      value={value}
      ref={ref}
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
};
