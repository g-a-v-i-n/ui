import React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { Text } from "../text";
import styles from "./styles.module.css";

export const DialogRoot = DialogPrimitive.Root;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;

export const DialogTrigger = (props: DialogPrimitive.DialogTriggerProps) => (
  <DialogPrimitive.Trigger asChild {...props} />
);

export const DialogOverlay = ({ className = "", ref, ...props }: DialogPrimitive.DialogOverlayProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <DialogPrimitive.Overlay
      {...props}
      ref={ref}
      className={`${styles.overlay} ${className}`}
    />
  );
};

export const DialogContent = ({
  children,
  className = "",
  ref,
  ...props
}: DialogPrimitive.DialogContentProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content
        {...props}
        ref={ref}
        className={`${styles.content} ${className}`}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
};

export const DialogTitle = ({ children, className = "", ref, ...props }: DialogPrimitive.DialogTitleProps & { ref?: React.Ref<HTMLHeadingElement> }) => {
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

export const DialogDescription = ({
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
