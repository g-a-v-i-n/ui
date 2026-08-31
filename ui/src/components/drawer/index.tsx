import React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { Text } from "../text";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import { styled } from "../../lib/styled";

export const DrawerRoot = DialogPrimitive.Root;
export const DrawerPortal = DialogPrimitive.Portal;
export const DrawerClose = DialogPrimitive.Close;

export const DrawerTrigger = (props: DialogPrimitive.DialogTriggerProps) => (
  <DialogPrimitive.Trigger asChild {...props} />
);

export const DrawerOverlay = styled(DialogPrimitive.Overlay, styles.overlay, "DrawerOverlay");

type Side = "left" | "right" | "top" | "bottom";

export const DrawerContent = ({
  children,
  scrim = true,
  side = "right",
  elevated = false,
  className,
  ref,
  ...props
}: DialogPrimitive.DialogContentProps & {
  scrim?: boolean;
  side?: Side;
  /** Full elevated shadow (rim + drop); false draws only the hairline. */
  elevated?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}) => {
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

export const DrawerTitle = ({ children, className, ref, ...props }: DialogPrimitive.DialogTitleProps & { ref?: React.Ref<HTMLHeadingElement> }) => {
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

export const DrawerDescription = ({
  children,
  className,
  ref,
  ...props
}: DialogPrimitive.DialogDescriptionProps & { ref?: React.Ref<HTMLParagraphElement> }) => {
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
