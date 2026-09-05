import React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { Text } from "../text";
import { Icon } from "../icon";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import { styled } from "../../lib/styled";

export const AccordionRoot = ({
  className,
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
      className={cx(styles.root, className)}
    />
  );
};

export const AccordionItem = styled(AccordionPrimitive.Item, styles.item, "AccordionItem");

export const AccordionTrigger = ({
  children,
  className,
  ref,
  ...props
}: AccordionPrimitive.AccordionTriggerProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  return (
    <AccordionPrimitive.Header className={styles.header}>
      <AccordionPrimitive.Trigger
        {...props}
        ref={ref}
        className={cx(styles.trigger, className)}
      >
        <Text as="span" size="md" weight="medium" color="primary">
          {children}
        </Text>
        <span className={styles.chevron} aria-hidden="true">
          <Icon icon="chevron-down" size="sm" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
};

export const AccordionContent = ({
  children,
  className,
  ref,
  ...props
}: AccordionPrimitive.AccordionContentProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <AccordionPrimitive.Content
      {...props}
      ref={ref}
      className={cx(styles.content, className)}
    >
      <div className={styles.contentInner}>
        <Text as="div" size="md" color="secondary">
          {children}
        </Text>
      </div>
    </AccordionPrimitive.Content>
  );
};
