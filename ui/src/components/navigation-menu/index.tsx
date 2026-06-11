import React, { type Ref } from "react";
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui";
import { Text } from "../text";
import { SFSymbol } from "../sf-symbol";
import styles from "./styles.module.css";

export const NavigationMenuItem = NavigationMenuPrimitive.Item;
export const NavigationMenuSub = NavigationMenuPrimitive.Sub;

export const NavigationMenuRoot = React.forwardRef(
  (
    {
      children,
      className = "",
      ...props
    }: NavigationMenuPrimitive.NavigationMenuProps,
    forwardedRef: Ref<HTMLElement> | undefined
  ) => {
    return (
      <NavigationMenuPrimitive.Root
        {...props}
        ref={forwardedRef}
        className={`${styles.root} ${className}`}
      >
        {children}
        <div className={styles.viewportPosition}>
          <NavigationMenuPrimitive.Viewport className={styles.viewport} />
        </div>
      </NavigationMenuPrimitive.Root>
    );
  }
);

NavigationMenuRoot.displayName = "NavigationMenuRoot";

export const NavigationMenuList = React.forwardRef(
  (
    {
      className = "",
      ...props
    }: NavigationMenuPrimitive.NavigationMenuListProps,
    forwardedRef: Ref<HTMLUListElement> | undefined
  ) => {
    return (
      <NavigationMenuPrimitive.List
        {...props}
        ref={forwardedRef}
        className={`${styles.list} ${className}`}
      />
    );
  }
);

NavigationMenuList.displayName = "NavigationMenuList";

export const NavigationMenuTrigger = React.forwardRef(
  (
    {
      children,
      className = "",
      ...props
    }: NavigationMenuPrimitive.NavigationMenuTriggerProps,
    forwardedRef: Ref<HTMLButtonElement> | undefined
  ) => {
    return (
      <NavigationMenuPrimitive.Trigger
        {...props}
        ref={forwardedRef}
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
  }
);

NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

export const NavigationMenuContent = React.forwardRef(
  (
    {
      className = "",
      ...props
    }: NavigationMenuPrimitive.NavigationMenuContentProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <NavigationMenuPrimitive.Content
        {...props}
        ref={forwardedRef}
        className={`${styles.content} ${className}`}
      />
    );
  }
);

NavigationMenuContent.displayName = "NavigationMenuContent";

export const NavigationMenuLink = React.forwardRef(
  (
    {
      children,
      className = "",
      ...props
    }: NavigationMenuPrimitive.NavigationMenuLinkProps,
    forwardedRef: Ref<HTMLAnchorElement> | undefined
  ) => {
    return (
      <NavigationMenuPrimitive.Link
        {...props}
        ref={forwardedRef}
        className={`${styles.link} ${className}`}
      >
        <Text as="span" size="sm" color="inherit">
          {children}
        </Text>
      </NavigationMenuPrimitive.Link>
    );
  }
);

NavigationMenuLink.displayName = "NavigationMenuLink";
