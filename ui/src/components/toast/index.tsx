import React, { type Ref } from "react";
import { Toast as ToastPrimitive } from "radix-ui";
import { Text } from "../text";
import { SFSymbol } from "../sf-symbol";
import styles from "./styles.module.css";

export const ToastProvider = ToastPrimitive.Provider;

export const ToastViewport = React.forwardRef(
  (
    { className = "", ...props }: ToastPrimitive.ToastViewportProps,
    forwardedRef: Ref<HTMLOListElement> | undefined
  ) => {
    return (
      <ToastPrimitive.Viewport
        {...props}
        ref={forwardedRef}
        className={`${styles.viewport} ${className}`}
      />
    );
  }
);

ToastViewport.displayName = "ToastViewport";

export const ToastRoot = React.forwardRef(
  (
    { className = "", ...props }: ToastPrimitive.ToastProps,
    forwardedRef: Ref<HTMLLIElement> | undefined
  ) => {
    return (
      <ToastPrimitive.Root
        {...props}
        ref={forwardedRef}
        className={`${styles.root} ${className}`}
      />
    );
  }
);

ToastRoot.displayName = "ToastRoot";

export const ToastTitle = React.forwardRef(
  (
    { children, className = "", ...props }: ToastPrimitive.ToastTitleProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <ToastPrimitive.Title {...props} ref={forwardedRef} asChild>
        <Text
          as="div"
          size="sm"
          weight="medium"
          color="primary"
          className={`${styles.title} ${className}`}
        >
          {children}
        </Text>
      </ToastPrimitive.Title>
    );
  }
);

ToastTitle.displayName = "ToastTitle";

export const ToastDescription = React.forwardRef(
  (
    {
      children,
      className = "",
      ...props
    }: ToastPrimitive.ToastDescriptionProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <ToastPrimitive.Description {...props} ref={forwardedRef} asChild>
        <Text
          as="div"
          size="sm"
          color="secondary"
          className={`${styles.description} ${className}`}
        >
          {children}
        </Text>
      </ToastPrimitive.Description>
    );
  }
);

ToastDescription.displayName = "ToastDescription";

export const ToastAction = React.forwardRef(
  (
    { className = "", ...props }: ToastPrimitive.ToastActionProps,
    forwardedRef: Ref<HTMLButtonElement> | undefined
  ) => {
    return (
      <ToastPrimitive.Action
        {...props}
        ref={forwardedRef}
        className={`${styles.action} ${className}`}
      />
    );
  }
);

ToastAction.displayName = "ToastAction";

export const ToastClose = React.forwardRef(
  (
    { className = "", ...props }: ToastPrimitive.ToastCloseProps,
    forwardedRef: Ref<HTMLButtonElement> | undefined
  ) => {
    return (
      <ToastPrimitive.Close
        aria-label="Dismiss"
        {...props}
        ref={forwardedRef}
        className={`${styles.close} ${className}`}
      >
        <SFSymbol symbol="✕" size="sm" />
      </ToastPrimitive.Close>
    );
  }
);

ToastClose.displayName = "ToastClose";
