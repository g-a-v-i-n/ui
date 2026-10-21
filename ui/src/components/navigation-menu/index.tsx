import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui";
import { Text } from "../text";
import { ChevronDownIcon } from "../icon/static/chevron-down";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import { styled } from "../../lib/styled";
import type { PropsOf } from "../../lib/props";

export const NavigationMenuItem = NavigationMenuPrimitive.Item;
export type NavigationMenuItemProps = PropsOf<typeof NavigationMenuItem>;
export const NavigationMenuSub = NavigationMenuPrimitive.Sub;
export type NavigationMenuSubProps = PropsOf<typeof NavigationMenuSub>;

export type NavigationMenuRootProps = PropsOf<typeof NavigationMenuPrimitive.Root>;

export const NavigationMenuRoot = ({
  children,
  className,
  ref,
  ...props
}: NavigationMenuRootProps) => {
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
export type NavigationMenuListProps = PropsOf<typeof NavigationMenuList>;

export type NavigationMenuTriggerProps = PropsOf<typeof NavigationMenuPrimitive.Trigger>;

export const NavigationMenuTrigger = ({
  children,
  className,
  asChild,
  ref,
  ...props
}: NavigationMenuTriggerProps) => {
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
            <ChevronDownIcon size="sm" />
          </span>
        </>
      )}
    </NavigationMenuPrimitive.Trigger>
  );
};

export const NavigationMenuContent = styled(NavigationMenuPrimitive.Content, styles.content, "NavigationMenuContent");
export type NavigationMenuContentProps = PropsOf<typeof NavigationMenuContent>;

export type NavigationMenuLinkProps = PropsOf<typeof NavigationMenuPrimitive.Link>;

export const NavigationMenuLink = ({
  children,
  className,
  asChild,
  ref,
  ...props
}: NavigationMenuLinkProps) => {
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
