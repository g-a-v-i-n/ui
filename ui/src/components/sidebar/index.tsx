import React, { type Ref } from "react";
import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import { Text } from "../text";
import { SFSymbol } from "../sf-symbol";
import styles from "./styles.module.css";

export const Sidebar = React.forwardRef(
  (
    { className = "", ...props }: React.HTMLAttributes<HTMLElement>,
    forwardedRef: Ref<HTMLElement> | undefined
  ) => {
    return (
      <aside
        {...props}
        ref={forwardedRef}
        className={`${styles.root} ${className}`}
      />
    );
  }
);

Sidebar.displayName = "Sidebar";

export const SidebarHeader = React.forwardRef(
  (
    { className = "", ...props }: React.HTMLAttributes<HTMLDivElement>,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <div
        {...props}
        ref={forwardedRef}
        className={`${styles.header} ${className}`}
      />
    );
  }
);

SidebarHeader.displayName = "SidebarHeader";

export const SidebarContent = React.forwardRef(
  (
    { className = "", ...props }: React.HTMLAttributes<HTMLDivElement>,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <div
        {...props}
        ref={forwardedRef}
        className={`${styles.content} ${className}`}
      />
    );
  }
);

SidebarContent.displayName = "SidebarContent";

export const SidebarFooter = React.forwardRef(
  (
    { className = "", ...props }: React.HTMLAttributes<HTMLDivElement>,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <div
        {...props}
        ref={forwardedRef}
        className={`${styles.footer} ${className}`}
      />
    );
  }
);

SidebarFooter.displayName = "SidebarFooter";

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

SidebarSectionLabel.displayName = "SidebarSectionLabel";

export const SidebarSection = React.forwardRef(
  (
    {
      label,
      children,
      className = "",
      ...props
    }: React.HTMLAttributes<HTMLDivElement> & { label?: React.ReactNode },
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <div
        {...props}
        ref={forwardedRef}
        className={`${styles.section} ${className}`}
      >
        {label != null && <SidebarSectionLabel>{label}</SidebarSectionLabel>}
        {children}
      </div>
    );
  }
);

SidebarSection.displayName = "SidebarSection";

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

export const SidebarItem = React.forwardRef(
  (
    {
      active = false,
      href,
      prefixSlot,
      suffixSlot,
      children,
      className = "",
      ...props
    }: SidebarItemProps,
    forwardedRef: Ref<HTMLElement> | undefined
  ) => {
    const Tag = (href != null ? "a" : "button") as React.ElementType;

    return (
      <Tag
        {...props}
        href={href}
        ref={forwardedRef}
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
  }
);

SidebarItem.displayName = "SidebarItem";

export const SidebarSeparator = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} className={`${styles.separator} ${className}`} />;
};

SidebarSeparator.displayName = "SidebarSeparator";

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

SidebarCollapsibleSection.displayName = "SidebarCollapsibleSection";
