import React, { type Ref } from "react";
import { AlertDialog as AlertDialogPrimitive } from "radix-ui";
import { Button } from "../button";
import { Text } from "../text";
import styles from "./styles.module.css";

export const AlertDialogRoot = AlertDialogPrimitive.Root;
export const AlertDialogPortal = AlertDialogPrimitive.Portal;

export const AlertDialogTrigger = (
  props: AlertDialogPrimitive.AlertDialogTriggerProps
) => <AlertDialogPrimitive.Trigger asChild {...props} />;

export const AlertDialogOverlay = React.forwardRef(
  (
    { className = "", ...props }: AlertDialogPrimitive.AlertDialogOverlayProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <AlertDialogPrimitive.Overlay
        {...props}
        ref={forwardedRef}
        className={`${styles.overlay} ${className}`}
      />
    );
  }
);

AlertDialogOverlay.displayName = "AlertDialogOverlay";

export const AlertDialogContent = React.forwardRef(
  (
    {
      children,
      className = "",
      ...props
    }: AlertDialogPrimitive.AlertDialogContentProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <AlertDialogPrimitive.Portal>
        <AlertDialogOverlay />
        <AlertDialogPrimitive.Content
          {...props}
          ref={forwardedRef}
          className={`${styles.content} ${className}`}
        >
          {children}
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    );
  }
);

AlertDialogContent.displayName = "AlertDialogContent";

export const AlertDialogTitle = React.forwardRef(
  (
    {
      children,
      className = "",
      ...props
    }: AlertDialogPrimitive.AlertDialogTitleProps,
    forwardedRef: Ref<HTMLHeadingElement> | undefined
  ) => {
    return (
      <AlertDialogPrimitive.Title {...props} ref={forwardedRef} asChild>
        <Text
          as="h2"
          size="sm"
          weight="medium"
          color="primary"
          className={`${styles.title} ${className}`}
        >
          {children}
        </Text>
      </AlertDialogPrimitive.Title>
    );
  }
);

AlertDialogTitle.displayName = "AlertDialogTitle";

export const AlertDialogDescription = React.forwardRef(
  (
    {
      children,
      className = "",
      ...props
    }: AlertDialogPrimitive.AlertDialogDescriptionProps,
    forwardedRef: Ref<HTMLParagraphElement> | undefined
  ) => {
    return (
      <AlertDialogPrimitive.Description {...props} ref={forwardedRef} asChild>
        <Text
          as="p"
          size="sm"
          color="secondary"
          className={`${styles.description} ${className}`}
        >
          {children}
        </Text>
      </AlertDialogPrimitive.Description>
    );
  }
);

AlertDialogDescription.displayName = "AlertDialogDescription";

export const AlertDialogAction = React.forwardRef(
  (
    { children, ...props }: AlertDialogPrimitive.AlertDialogActionProps,
    forwardedRef: Ref<HTMLButtonElement> | undefined
  ) => {
    return (
      <AlertDialogPrimitive.Action {...props} ref={forwardedRef} asChild>
        <Button variant="primary">{children}</Button>
      </AlertDialogPrimitive.Action>
    );
  }
);

AlertDialogAction.displayName = "AlertDialogAction";

export const AlertDialogCancel = React.forwardRef(
  (
    { children, ...props }: AlertDialogPrimitive.AlertDialogCancelProps,
    forwardedRef: Ref<HTMLButtonElement> | undefined
  ) => {
    return (
      <AlertDialogPrimitive.Cancel {...props} ref={forwardedRef} asChild>
        <Button variant="secondary">{children}</Button>
      </AlertDialogPrimitive.Cancel>
    );
  }
);

AlertDialogCancel.displayName = "AlertDialogCancel";

export const AlertDialogFooter = ({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={`${styles.footer} ${className}`}>
      {children}
    </div>
  );
};

AlertDialogFooter.displayName = "AlertDialogFooter";
