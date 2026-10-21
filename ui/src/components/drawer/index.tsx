import { Dialog as DialogPrimitive } from "radix-ui";
import { Text } from "../text";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import { styled } from "../../lib/styled";
import type { PropsOf } from "../../lib/props";

export const DrawerRoot = DialogPrimitive.Root;
export type DrawerRootProps = PropsOf<typeof DrawerRoot>;
export const DrawerPortal = DialogPrimitive.Portal;
export type DrawerPortalProps = PropsOf<typeof DrawerPortal>;
export const DrawerClose = DialogPrimitive.Close;
export type DrawerCloseProps = PropsOf<typeof DrawerClose>;

export type DrawerTriggerProps = PropsOf<typeof DialogPrimitive.Trigger>;

export const DrawerTrigger = (props: DrawerTriggerProps) => (
  <DialogPrimitive.Trigger asChild {...props} />
);

export const DrawerOverlay = styled(DialogPrimitive.Overlay, styles.overlay, "DrawerOverlay");
export type DrawerOverlayProps = PropsOf<typeof DrawerOverlay>;

type Side = "left" | "right" | "top" | "bottom";

export type DrawerContentProps = PropsOf<typeof DialogPrimitive.Content> & {
  scrim?: boolean;
  side?: Side;
  /** Full elevated shadow (rim + drop); false draws only the hairline. */
  elevated?: boolean;
};

export const DrawerContent = ({
  children,
  scrim = true,
  side = "right",
  elevated = false,
  className,
  ref,
  ...props
}: DrawerContentProps) => {
  return (
    <DialogPrimitive.Portal>
      {scrim ? <DrawerOverlay /> : null}
      <DialogPrimitive.Content
        {...props}
        ref={ref}
        data-side={side}
        data-elevated={elevated}
        className={cx(styles.content, className)}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
};

export type DrawerTitleProps = PropsOf<typeof DialogPrimitive.Title>;

export const DrawerTitle = ({ children, className, ref, ...props }: DrawerTitleProps) => {
  return (
    <DialogPrimitive.Title {...props} ref={ref} asChild>
      <Text
        as="h2"
        size="sm"
        weight="medium"
        color="primary"
        className={cx(styles.title, className)}
      >
        {children}
      </Text>
    </DialogPrimitive.Title>
  );
};

export type DrawerDescriptionProps = PropsOf<typeof DialogPrimitive.Description>;

export const DrawerDescription = ({
  children,
  className,
  ref,
  ...props
}: DrawerDescriptionProps) => {
  return (
    <DialogPrimitive.Description {...props} ref={ref} asChild>
      <Text
        as="p"
        size="sm"
        color="secondary"
        className={cx(styles.description, className)}
      >
        {children}
      </Text>
    </DialogPrimitive.Description>
  );
};
