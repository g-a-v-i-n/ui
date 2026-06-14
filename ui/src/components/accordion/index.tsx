import React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { Text } from "../text";
import { SFSymbol } from "../sf-symbol";
import styles from "./styles.module.css";

export const AccordionRoot = ({
  className = "",
  ref,
  ...props
}: (
  | AccordionPrimitive.AccordionSingleProps
  | AccordionPrimitive.AccordionMultipleProps
) & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <AccordionPrimitive.Root
      {...props}
      ref={ref}
      className={`${styles.root} ${className}`}
    />
  );
};

export const AccordionItem = ({ className = "", ref, ...props }: AccordionPrimitive.AccordionItemProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <AccordionPrimitive.Item
      {...props}
      ref={ref}
      className={`${styles.item} ${className}`}
    />
  );
};

export const AccordionTrigger = ({
  children,
  className = "",
  ref,
  ...props
}: AccordionPrimitive.AccordionTriggerProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  return (
    <AccordionPrimitive.Header className={styles.header}>
      <AccordionPrimitive.Trigger
        {...props}
        ref={ref}
        className={`${styles.trigger} ${className}`}
      >
        <Text as="span" size="sm" weight="medium" color="primary">
          {children}
        </Text>
        <span className={styles.chevron} aria-hidden="true">
          <SFSymbol symbol="􀆈" size="sm" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
};

export const AccordionContent = ({
  children,
  className = "",
  ref,
  ...props
}: AccordionPrimitive.AccordionContentProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <AccordionPrimitive.Content
      {...props}
      ref={ref}
      className={`${styles.content} ${className}`}
    >
      <div className={styles.contentInner}>
        <Text as="div" size="sm" color="secondary">
          {children}
        </Text>
      </div>
    </AccordionPrimitive.Content>
  );
};
