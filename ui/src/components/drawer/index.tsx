import React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { Text } from "../text";
import styles from "./styles.module.css";

export const DrawerRoot = DialogPrimitive.Root;
export const DrawerPortal = DialogPrimitive.Portal;
export const DrawerClose = DialogPrimitive.Close;

export const DrawerTrigger = (props: DialogPrimitive.DialogTriggerProps) => (
  <DialogPrimitive.Trigger asChild {...props} />
);

export const DrawerOverlay = ({ className = "", ref, ...props }: DialogPrimitive.DialogOverlayProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <DialogPrimitive.Overlay
      {...props}
      ref={ref}
      className={`${styles.overlay} ${className}`}
    />
  );
};

type Side = "left" | "right" | "top" | "bottom";

export const DrawerContent = ({
  children,
  side = "right",
  className = "",
  ref,
  ...props
}: DialogPrimitive.DialogContentProps & {
  side?: Side;
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <DialogPrimitive.Portal>
      <DrawerOverlay />
      <DialogPrimitive.Content
        {...props}
        ref={ref}
        data-side={side}
        className={`${styles.content} ${className}`}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
};

export const DrawerTitle = ({ children, className = "", ref, ...props }: DialogPrimitive.DialogTitleProps & { ref?: React.Ref<HTMLHeadingElement> }) => {
  return (
    <DialogPrimitive.Title {...props} ref={ref} asChild>
      <Text
        as="h2"
        size="sm"
        weight="medium"
        color="primary"
        className={`${styles.title} ${className}`}
      >
        {children}
      </Text>
    </DialogPrimitive.Title>
  );
};

export const DrawerDescription = ({
  children,
  className = "",
  ref,
  ...props
}: DialogPrimitive.DialogDescriptionProps & { ref?: React.Ref<HTMLParagraphElement> }) => {
  return (
    <DialogPrimitive.Description {...props} ref={ref} asChild>
      <Text
        as="p"
        size="sm"
        color="secondary"
        className={`${styles.description} ${className}`}
      >
        {children}
      </Text>
    </DialogPrimitive.Description>
  );
};
