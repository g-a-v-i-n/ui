import React from "react";
import { Toast as ToastPrimitive } from "radix-ui";
import { Text } from "../text";
import { SFSymbol } from "../sf-symbol";
import styles from "./styles.module.css";
import { wrapTextChildren } from "../text/wrap";
import { cx } from "../../lib/cx";
import { styled } from "../../lib/styled";

export const ToastProvider = ToastPrimitive.Provider;

export const ToastViewport = styled(ToastPrimitive.Viewport, styles.viewport, "ToastViewport");

export const ToastRoot = styled(ToastPrimitive.Root, styles.root, "ToastRoot");

export const ToastTitle = ({ children, className, ref, ...props }: ToastPrimitive.ToastTitleProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <ToastPrimitive.Title {...props} ref={ref} asChild>
      <Text
        as="div"
        size="sm"
        weight="medium"
        color="primary"
        className={cx(styles.title, className)}
      >
        {children}
      </Text>
    </ToastPrimitive.Title>
  );
};

export const ToastDescription = ({
  children,
  className,
  ref,
  ...props
}: ToastPrimitive.ToastDescriptionProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <ToastPrimitive.Description {...props} ref={ref} asChild>
      <Text
        as="div"
        size="sm"
        color="secondary"
        className={cx(styles.description, className)}
      >
        {children}
      </Text>
    </ToastPrimitive.Description>
  );
};

export const ToastAction = ({ className, asChild, children, ref, ...props }: ToastPrimitive.ToastActionProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  return (
    <ToastPrimitive.Action
      {...props}
      asChild={asChild}
      ref={ref}
      className={cx(styles.action, className)}
    >
      {asChild
        ? children
        : wrapTextChildren(children)}
    </ToastPrimitive.Action>
  );
};

export const ToastClose = ({ className, asChild, children, ref, ...props }: ToastPrimitive.ToastCloseProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  return (
    <ToastPrimitive.Close
      aria-label="Dismiss"
      {...props}
      asChild={asChild}
      ref={ref}
      className={cx(styles.close, className)}
    >
      {asChild ? children : <SFSymbol symbol="✕" size="sm" />}
    </ToastPrimitive.Close>
  );
};
