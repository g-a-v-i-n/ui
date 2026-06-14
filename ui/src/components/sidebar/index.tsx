import React from "react";
import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import { Text } from "../text";
import { SFSymbol } from "../sf-symbol";
import styles from "./styles.module.css";

export const Sidebar = ({ className = "", ref, ...props }: React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }) => {
  return (
    <aside
      {...props}
      ref={ref}
      className={`${styles.root} ${className}`}
    />
  );
};

export const SidebarHeader = ({ className = "", ref, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <div
      {...props}
      ref={ref}
      className={`${styles.header} ${className}`}
    />
  );
};

export const SidebarContent = ({ className = "", ref, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <div
      {...props}
      ref={ref}
      className={`${styles.content} ${className}`}
    />
  );
};

export const SidebarFooter = ({ className = "", ref, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <div
      {...props}
      ref={ref}
      className={`${styles.footer} ${className}`}
    />
  );
};

export const SidebarSectionLabel = ({
  children,
  className = "",
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
      className={`${styles.sectionLabel} ${className}`}
      {...props}
    >
      {children}
    </Text>
  );
};

export const SidebarSection = ({
  label,
  children,
  className = "",
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { label?: React.ReactNode } & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <div
      {...props}
      ref={ref}
      className={`${styles.section} ${className}`}
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
  className = "",
  ref,
  ...props
}: SidebarItemProps & { ref?: React.Ref<HTMLElement> }) => {
  const Tag = (href != null ? "a" : "button") as React.ElementType;

  return (
    <Tag
      {...props}
      href={href}
      ref={ref}
      data-active={active || undefined}
      className={`${styles.item} ${className}`}
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
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} className={`${styles.separator} ${className}`} />;
};

export const SidebarCollapsibleSection = ({
  label,
  defaultOpen = true,
  open,
  onOpenChange,
  children,
  className = "",
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
      className={`${styles.section} ${className}`}
    >
      <CollapsiblePrimitive.Trigger className={styles.collapsibleTrigger}>
        <Text as="span" size="xs" weight="medium" color="tertiary">
          {label}
        </Text>
        <span className={styles.collapsibleChevron} aria-hidden="true">
          <SFSymbol symbol="􀆈" size="sm" />
        </span>
      </CollapsiblePrimitive.Trigger>
      <CollapsiblePrimitive.Content className={styles.collapsibleContent}>
        <div className={styles.collapsibleInner}>{children}</div>
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  );
};
