import React from "react";
import { Tabs as TabsPrimitive } from "radix-ui";
import { motion } from "motion/react";
import { Text } from "../text";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import { styled } from "../../lib/styled";

/* The active trigger renders the underline as a motion element with an
   instance-scoped layoutId, so it glides between tabs on change. */
const TabsContext = React.createContext<{
  value: string | undefined;
  baseId: string;
}>({ value: undefined, baseId: "" });

const transition = {
  duration: 0.18,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

export const TabsRoot = ({
  className,
  value,
  defaultValue,
  onValueChange,
  children,
  ref,
  ...props
}: TabsPrimitive.TabsProps & { ref?: React.Ref<HTMLDivElement> }) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const baseId = React.useId();

  const currentValue = value ?? internalValue;
  const handleValueChange = (next: string) => {
    setInternalValue(next);
    onValueChange?.(next);
  };

  return (
    <TabsPrimitive.Root
      {...props}
      value={value}
      defaultValue={defaultValue}
      onValueChange={handleValueChange}
      ref={ref}
      className={cx(styles.root, className)}
    >
      <TabsContext.Provider value={{ value: currentValue, baseId }}>
        {children}
      </TabsContext.Provider>
    </TabsPrimitive.Root>
  );
};

export const TabsList = styled(TabsPrimitive.List, styles.list, "TabsList");

export const TabsTrigger = ({
  children,
  value,
  className,
  ref,
  ...props
}: TabsPrimitive.TabsTriggerProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  const ctx = React.useContext(TabsContext);
  const isActive = ctx.value === value;

  return (
    <TabsPrimitive.Trigger
      {...props}
      value={value}
      ref={ref}
      className={cx(styles.trigger, className)}
    >
      <Text as="span" size="md" weight="medium">
        {children}
      </Text>
      {isActive && (
        <motion.span
          layoutId={`${ctx.baseId}-underline`}
          transition={transition}
          className={styles.underline}
        />
      )}
    </TabsPrimitive.Trigger>
  );
};

export const TabsContent = styled(TabsPrimitive.Content, styles.content, "TabsContent");
