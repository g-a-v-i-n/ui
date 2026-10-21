import React from "react";
import { Toast as ToastPrimitive } from "radix-ui";
import { Text } from "../text";
import { XmarkIcon } from "../icon/static/xmark";
import styles from "./styles.module.css";
import { wrapTextChildren } from "../text/wrap";
import { cx } from "../../lib/cx";
import { styled } from "../../lib/styled";
import type { PropsOf } from "../../lib/props";

export const ToastProvider = ToastPrimitive.Provider;
export type ToastProviderProps = PropsOf<typeof ToastProvider>;

export const ToastViewport = styled(ToastPrimitive.Viewport, styles.viewport, "ToastViewport");
export type ToastViewportProps = PropsOf<typeof ToastViewport>;

export const ToastRoot = styled(ToastPrimitive.Root, styles.root, "ToastRoot");
export type ToastRootProps = PropsOf<typeof ToastRoot>;

export type ToastTitleProps = PropsOf<typeof ToastPrimitive.Title>;

export const ToastTitle = ({ children, className, ref, ...props }: ToastTitleProps) => {
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

export type ToastDescriptionProps = PropsOf<typeof ToastPrimitive.Description>;

export const ToastDescription = ({
  children,
  className,
  ref,
  ...props
}: ToastDescriptionProps) => {
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

export type ToastActionProps = PropsOf<typeof ToastPrimitive.Action>;

export const ToastAction = ({ className, asChild, children, ref, ...props }: ToastActionProps) => {
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

export type ToastCloseProps = PropsOf<typeof ToastPrimitive.Close>;

export const ToastClose = ({ className, asChild, children, ref, ...props }: ToastCloseProps) => {
  return (
    <ToastPrimitive.Close
      aria-label="Dismiss"
      {...props}
      asChild={asChild}
      ref={ref}
      className={cx(styles.close, className)}
    >
      {asChild ? children : <XmarkIcon size="sm" />}
    </ToastPrimitive.Close>
  );
};
