import React from "react";
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui";
import { Text } from "../text";
import { SFSymbol } from "../sf-symbol";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import { styled } from "../../lib/styled";

export const NavigationMenuItem = NavigationMenuPrimitive.Item;
export const NavigationMenuSub = NavigationMenuPrimitive.Sub;

export const NavigationMenuRoot = ({
  children,
  className,
  ref,
  ...props
}: NavigationMenuPrimitive.NavigationMenuProps & { ref?: React.Ref<HTMLElement> }) => {
  return (
    <NavigationMenuPrimitive.Root
      {...props}
      ref={ref}
      className={cx(styles.root, className)}
    >
      {children}
      <div className={styles.viewportPosition}>
        <NavigationMenuPrimitive.Viewport className={styles.viewport} />
      </div>
    </NavigationMenuPrimitive.Root>
  );
};

export const NavigationMenuList = styled(NavigationMenuPrimitive.List, styles.list, "NavigationMenuList");

export const NavigationMenuTrigger = ({
  children,
  className,
  asChild,
  ref,
  ...props
}: NavigationMenuPrimitive.NavigationMenuTriggerProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  return (
    <NavigationMenuPrimitive.Trigger
      {...props}
      asChild={asChild}
      ref={ref}
      className={cx(styles.trigger, className)}
    >
      {asChild ? (
        children
      ) : (
        <>
          <Text as="span" size="sm" weight="medium" color="inherit">
            {children}
          </Text>
          <span className={styles.chevron} aria-hidden="true">
            <SFSymbol symbol="􀆈" size="sm" />
          </span>
        </>
      )}
    </NavigationMenuPrimitive.Trigger>
  );
};

export const NavigationMenuContent = styled(NavigationMenuPrimitive.Content, styles.content, "NavigationMenuContent");

export const NavigationMenuLink = ({
  children,
  className,
  asChild,
  ref,
  ...props
}: NavigationMenuPrimitive.NavigationMenuLinkProps & { ref?: React.Ref<HTMLAnchorElement> }) => {
  return (
    <NavigationMenuPrimitive.Link
      {...props}
      asChild={asChild}
      ref={ref}
      className={cx(styles.link, className)}
    >
      {asChild ? (
        children
      ) : (
        <Text as="span" size="sm" color="inherit">
          {children}
        </Text>
      )}
    </NavigationMenuPrimitive.Link>
  );
};
