import React, { type Ref } from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { Text } from "../text";
import { SFSymbol } from "../sf-symbol";
import styles from "./styles.module.css";

export const AccordionRoot = React.forwardRef(
  (
    {
      className = "",
      ...props
    }:
      | AccordionPrimitive.AccordionSingleProps
      | AccordionPrimitive.AccordionMultipleProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <AccordionPrimitive.Root
        {...props}
        ref={forwardedRef}
        className={`${styles.root} ${className}`}
      />
    );
  }
);

AccordionRoot.displayName = "AccordionRoot";

export const AccordionItem = React.forwardRef(
  (
    { className = "", ...props }: AccordionPrimitive.AccordionItemProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <AccordionPrimitive.Item
        {...props}
        ref={forwardedRef}
        className={`${styles.item} ${className}`}
      />
    );
  }
);

AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = React.forwardRef(
  (
    {
      children,
      className = "",
      ...props
    }: AccordionPrimitive.AccordionTriggerProps,
    forwardedRef: Ref<HTMLButtonElement> | undefined
  ) => {
    return (
      <AccordionPrimitive.Header className={styles.header}>
        <AccordionPrimitive.Trigger
          {...props}
          ref={forwardedRef}
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
  }
);

AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = React.forwardRef(
  (
    {
      children,
      className = "",
      ...props
    }: AccordionPrimitive.AccordionContentProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <AccordionPrimitive.Content
        {...props}
        ref={forwardedRef}
        className={`${styles.content} ${className}`}
      >
        <div className={styles.contentInner}>
          <Text as="div" size="sm" color="secondary">
            {children}
          </Text>
        </div>
      </AccordionPrimitive.Content>
    );
  }
);

AccordionContent.displayName = "AccordionContent";
