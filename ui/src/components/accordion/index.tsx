import { Accordion as AccordionPrimitive } from "radix-ui";
import { Text } from "../text";
import { ChevronDownIcon } from "../icon/static/chevron-down";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import { styled } from "../../lib/styled";
import type { PropsOf } from "../../lib/props";

export type AccordionRootProps = PropsOf<typeof AccordionPrimitive.Root>;

export const AccordionRoot = ({
  className,
  ref,
  ...props
}: AccordionRootProps) => {
  return (
    <AccordionPrimitive.Root
      {...props}
      ref={ref}
      className={cx(styles.root, className)}
    />
  );
};

export const AccordionItem = styled(AccordionPrimitive.Item, styles.item, "AccordionItem");
export type AccordionItemProps = PropsOf<typeof AccordionItem>;

export type AccordionTriggerProps = PropsOf<typeof AccordionPrimitive.Trigger>;

export const AccordionTrigger = ({
  children,
  className,
  ref,
  ...props
}: AccordionTriggerProps) => {
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
          <ChevronDownIcon size="sm" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
};

export type AccordionContentProps = PropsOf<typeof AccordionPrimitive.Content>;

export const AccordionContent = ({
  children,
  className,
  ref,
  ...props
}: AccordionContentProps) => {
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
