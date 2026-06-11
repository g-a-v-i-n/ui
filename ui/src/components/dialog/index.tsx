import React, { type Ref } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { Text } from "../text";
import styles from "./styles.module.css";

export const DialogRoot = DialogPrimitive.Root;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;

export const DialogTrigger = (props: DialogPrimitive.DialogTriggerProps) => (
  <DialogPrimitive.Trigger asChild {...props} />
);

export const DialogOverlay = React.forwardRef(
  (
    { className = "", ...props }: DialogPrimitive.DialogOverlayProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <DialogPrimitive.Overlay
        {...props}
        ref={forwardedRef}
        className={`${styles.overlay} ${className}`}
      />
    );
  }
);

DialogOverlay.displayName = "DialogOverlay";

export const DialogContent = React.forwardRef(
  (
    {
      children,
      className = "",
      ...props
    }: DialogPrimitive.DialogContentProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <DialogPrimitive.Portal>
        <DialogOverlay />
        <DialogPrimitive.Content
          {...props}
          ref={forwardedRef}
          className={`${styles.content} ${className} dark`}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    );
  }
);

DialogContent.displayName = "DialogContent";

export const DialogTitle = React.forwardRef(
  (
    { children, className = "", ...props }: DialogPrimitive.DialogTitleProps,
    forwardedRef: Ref<HTMLHeadingElement> | undefined
  ) => {
    return (
      <DialogPrimitive.Title {...props} ref={forwardedRef} asChild>
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
  }
);

DialogTitle.displayName = "DialogTitle";

export const DialogDescription = React.forwardRef(
  (
    {
      children,
      className = "",
      ...props
    }: DialogPrimitive.DialogDescriptionProps,
    forwardedRef: Ref<HTMLParagraphElement> | undefined
  ) => {
    return (
      <DialogPrimitive.Description {...props} ref={forwardedRef} asChild>
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
  }
);

DialogDescription.displayName = "DialogDescription";
