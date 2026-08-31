import React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { Text } from "../text";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import { styled } from "../../lib/styled";

export const DialogRoot = DialogPrimitive.Root;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;

export const DialogTrigger = (props: DialogPrimitive.DialogTriggerProps) => (
  <DialogPrimitive.Trigger asChild {...props} />
);

export const DialogOverlay = styled(DialogPrimitive.Overlay, styles.overlay, "DialogOverlay");

export const DialogContent = ({
  children,
  className,
  ref,
  ...props
}: DialogPrimitive.DialogContentProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content
        {...props}
        ref={ref}
        className={cx(styles.content, className)}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
};

export const DialogTitle = ({ children, className, ref, ...props }: DialogPrimitive.DialogTitleProps & { ref?: React.Ref<HTMLHeadingElement> }) => {
  return (
    <DialogPrimitive.Title {...props} ref={ref} asChild>
      <Text
        as="h2"
        size="lg"
        weight="semibold"
        color="primary"
        className={cx(styles.title, className)}
      >
        {children}
      </Text>
    </DialogPrimitive.Title>
  );
};

export const DialogDescription = ({
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
