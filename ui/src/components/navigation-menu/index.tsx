import React from "react";
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui";
import { Text } from "../text";
import { SFSymbol } from "../sf-symbol";
import styles from "./styles.module.css";

export const NavigationMenuItem = NavigationMenuPrimitive.Item;
export const NavigationMenuSub = NavigationMenuPrimitive.Sub;

export const NavigationMenuRoot = ({
  children,
  className = "",
  ref,
  ...props
}: NavigationMenuPrimitive.NavigationMenuProps & { ref?: React.Ref<HTMLElement> }) => {
  return (
    <NavigationMenuPrimitive.Root
      {...props}
      ref={ref}
      className={`${styles.root} ${className}`}
    >
      {children}
      <div className={styles.viewportPosition}>
        <NavigationMenuPrimitive.Viewport className={styles.viewport} />
      </div>
    </NavigationMenuPrimitive.Root>
  );
};

export const NavigationMenuList = ({
  className = "",
  ref,
  ...props
}: NavigationMenuPrimitive.NavigationMenuListProps & { ref?: React.Ref<HTMLUListElement> }) => {
  return (
    <NavigationMenuPrimitive.List
      {...props}
      ref={ref}
      className={`${styles.list} ${className}`}
    />
  );
};

export const NavigationMenuTrigger = ({
  children,
  className = "",
  ref,
  ...props
}: NavigationMenuPrimitive.NavigationMenuTriggerProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  return (
    <NavigationMenuPrimitive.Trigger
      {...props}
      ref={ref}
      className={`${styles.trigger} ${className}`}
    >
      <Text as="span" size="sm" weight="medium" color="inherit">
        {children}
      </Text>
      <span className={styles.chevron} aria-hidden="true">
        <SFSymbol symbol="􀆈" size="sm" />
      </span>
    </NavigationMenuPrimitive.Trigger>
  );
};

export const NavigationMenuContent = ({
  className = "",
  ref,
  ...props
}: NavigationMenuPrimitive.NavigationMenuContentProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <NavigationMenuPrimitive.Content
      {...props}
      ref={ref}
      className={`${styles.content} ${className}`}
    />
  );
};

export const NavigationMenuLink = ({
  children,
  className = "",
  ref,
  ...props
}: NavigationMenuPrimitive.NavigationMenuLinkProps & { ref?: React.Ref<HTMLAnchorElement> }) => {
  return (
    <NavigationMenuPrimitive.Link
      {...props}
      ref={ref}
      className={`${styles.link} ${className}`}
    >
      <Text as="span" size="sm" color="inherit">
        {children}
      </Text>
    </NavigationMenuPrimitive.Link>
  );
};
