import React from "react";
import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import { Text } from "../text";
import { Icon } from "../icon";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import { styled } from "../../lib/styled";

export const Sidebar = styled("aside", styles.root, "Sidebar");

export const SidebarHeader = styled("div", styles.header, "SidebarHeader");

export const SidebarContent = styled("div", styles.content, "SidebarContent");

export const SidebarFooter = styled("div", styles.footer, "SidebarFooter");

export const SidebarSectionLabel = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Text
      as="div"
      size="xs"
      weight="medium"
      color="tertiary"
      className={cx(styles.sectionLabel, className)}
      {...props}
    >
      {children}
    </Text>
  );
};

export const SidebarSection = ({
  label,
  children,
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { label?: React.ReactNode } & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <div
      {...props}
      ref={ref}
      className={cx(styles.section, className)}
    >
      {label != null && <SidebarSectionLabel>{label}</SidebarSectionLabel>}
      {children}
    </div>
  );
};

export type SidebarItemProps = {
  active?: boolean;
  href?: string;
  prefixSlot?: React.ReactNode;
  suffixSlot?: React.ReactNode;
  children?: React.ReactNode;
} & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "prefix"
>;

export const SidebarItem = ({
  active = false,
  href,
  prefixSlot,
  suffixSlot,
  children,
  className,
  ref,
  ...props
}: SidebarItemProps & { ref?: React.Ref<HTMLElement> }) => {
  const isLink = href != null;
  // SAFETY: widen the literal tag union so anchor-only props like `href` can be
  // spread; when rendering a button, `href` is undefined and inert.
  const Tag = (isLink ? "a" : "button") as React.ElementType;

  return (
    <Tag
      type={isLink ? undefined : "button"}
      aria-current={active ? (isLink ? "page" : "true") : undefined}
      {...props}
      href={href}
      ref={ref}
      data-active={active || undefined}
      className={cx(styles.item, className)}
    >
      {prefixSlot && <span className={styles.prefix}>{prefixSlot}</span>}
      <Text as="span" size="sm" truncate className={styles.itemLabel}>
        {children}
      </Text>
      {suffixSlot && <span className={styles.suffix}>{suffixSlot}</span>}
    </Tag>
  );
};

export const SidebarSeparator = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} className={cx(styles.separator, className)} />;
};

export const SidebarCollapsibleSection = ({
  label,
  defaultOpen = true,
  open,
  onOpenChange,
  children,
  className,
}: {
  label: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <CollapsiblePrimitive.Root
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      className={cx(styles.section, className)}
    >
      <CollapsiblePrimitive.Trigger className={styles.collapsibleTrigger}>
        <Text as="span" size="xs" weight="medium" color="tertiary">
          {label}
        </Text>
        <span className={styles.collapsibleChevron} aria-hidden="true">
          <Icon icon="chevron-down" size="sm" />
        </span>
      </CollapsiblePrimitive.Trigger>
      <CollapsiblePrimitive.Content className={styles.collapsibleContent}>
        <div className={styles.collapsibleInner}>{children}</div>
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  );
};
