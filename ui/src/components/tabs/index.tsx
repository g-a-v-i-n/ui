import React, { type Ref } from "react";
import { Tabs as TabsPrimitive } from "radix-ui";
import { motion } from "motion/react";
import { Text } from "../text";
import styles from "./styles.module.css";

/* The active trigger renders the highlight + underline as motion elements
   with instance-scoped layoutIds, so they glide between tabs on change. */
const TabsContext = React.createContext<{
  value: string | undefined;
  baseId: string;
}>({ value: undefined, baseId: "" });

const transition = {
  duration: 0.18,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

export const TabsRoot = React.forwardRef(
  (
    {
      className = "",
      value,
      defaultValue,
      onValueChange,
      children,
      ...props
    }: TabsPrimitive.TabsProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
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
        ref={forwardedRef}
        className={`${styles.root} ${className}`}
      >
        <TabsContext.Provider value={{ value: currentValue, baseId }}>
          {children}
        </TabsContext.Provider>
      </TabsPrimitive.Root>
    );
  }
);

TabsRoot.displayName = "TabsRoot";

export const TabsList = React.forwardRef(
  (
    { className = "", ...props }: TabsPrimitive.TabsListProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <TabsPrimitive.List
        {...props}
        ref={forwardedRef}
        className={`${styles.list} ${className}`}
      />
    );
  }
);

TabsList.displayName = "TabsList";

export const TabsTrigger = React.forwardRef(
  (
    {
      children,
      value,
      className = "",
      ...props
    }: TabsPrimitive.TabsTriggerProps,
    forwardedRef: Ref<HTMLButtonElement> | undefined
  ) => {
    const ctx = React.useContext(TabsContext);
    const isActive = ctx.value === value;

    return (
      <TabsPrimitive.Trigger
        {...props}
        value={value}
        ref={forwardedRef}
        className={`${styles.trigger} ${className}`}
      >
        {isActive && (
          <motion.span
            layoutId={`${ctx.baseId}-highlight`}
            transition={transition}
            className={styles.highlight}
          />
        )}
        <Text
          as="span"
          size="sm"
          weight="medium"
          color="inherit"
          className={styles.label}
        >
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
  }
);

TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = React.forwardRef(
  (
    { className = "", ...props }: TabsPrimitive.TabsContentProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <TabsPrimitive.Content
        {...props}
        ref={forwardedRef}
        className={`${styles.content} ${className}`}
      />
    );
  }
);

TabsContent.displayName = "TabsContent";
