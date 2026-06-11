import React from "react";
import { Text } from "../text";
import styles from "./styles.module.css";

export const MenuContainer = React.forwardRef(
  (
    {
      children,
      width = "auto",
      className = "",
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
      width?: "sm" | "md" | "lg" | "auto";
    },
    forwardedRef: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        {...props}
        ref={forwardedRef}
        data-width={width}
        className={`${styles.container} ${className}`}
      >
        {children}
      </div>
    );
  }
);

MenuContainer.displayName = "MenuContainer";

export const MenuItem = React.forwardRef(
  (
    {
      children,
      className = "",
      suffixSlot,
      prefixSlot,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
      suffixSlot?: React.ReactNode;
      prefixSlot?: React.ReactNode;
    },
    forwardedRef: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        {...props}
        ref={forwardedRef}
        className={`${styles.item} ${className}`}
      >
        <div className={styles.left}>
          {prefixSlot && <div className={styles.prefix}>{prefixSlot}</div>}
          <Text size="sm">{children}</Text>
        </div>
        {suffixSlot && (
          <Text as="div" size="sm" color="secondary" className={styles.suffix}>
            {suffixSlot}
          </Text>
        )}
      </div>
    );
  }
);

MenuItem.displayName = "MenuItem";

export const MenuDivider = () => {
  return (
    <div className={styles.divider}>
      <hr />
    </div>
  );
};

MenuDivider.displayName = "MenuDivider";

export const MenuGroup = React.forwardRef(
  (
    {
      children,
      className = "",
      ...props
    }: {
      children?: React.ReactNode;
      className?: string;
    },
    forwardedRef: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        {...props}
        ref={forwardedRef}
        className={`${styles.group} ${className}`}
      >
        {children}
      </div>
    );
  }
);

MenuGroup.displayName = "MenuGroup";

export const MenuLabel = ({
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
      className={`${className} ${styles.label}`}
      {...props}
    >{children}</Text>
  );
};

MenuLabel.displayName = "MenuLabel";

export const MenuTitle = ({
  children,
  className = "",
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <Text
      as="div"
      size="sm"
      weight="medium"
      className={`${className} ${styles.title}`}
      {...props}
    >
      {children}
    </Text>
  );
};

MenuTitle.displayName = "MenuTitle";

export const MenuList = ({
  children,
  className = "",
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`${className} ${styles.menuList}`} {...props}>
      {children}
    </div>
  );
};

MenuList.displayName = "MenuList";

export const MenuListItem = ({
  className = "",
  label,
  value,
  ...props
}: {
  className?: string;
  label?: string;
  value?: string | number | null;
}) => {
  return (
    <div className={`${className} ${styles.listItem}`} {...props}>
      <Text size="sm" color="secondary" className={styles.listItemLabel}>
        {label}
      </Text>
      <Text size="sm" className={styles.listItemValue}>
        {value}
      </Text>
    </div>
  );
};

MenuListItem.displayName = "MenuListItem";
