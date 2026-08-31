import React from "react";
import { Toast as ToastPrimitive } from "radix-ui";
import { Text } from "../text";
import { SFSymbol } from "../sf-symbol";
import styles from "./styles.module.css";

export const ToastProvider = ToastPrimitive.Provider;

export const ToastViewport = ({ className = "", ref, ...props }: ToastPrimitive.ToastViewportProps & { ref?: React.Ref<HTMLOListElement> }) => {
  return (
    <ToastPrimitive.Viewport
      {...props}
      ref={ref}
      className={`${styles.viewport} ${className}`}
    />
  );
};

export const ToastRoot = ({ className = "", ref, ...props }: ToastPrimitive.ToastProps & { ref?: React.Ref<HTMLLIElement> }) => {
  return (
    <ToastPrimitive.Root
      {...props}
      ref={ref}
      className={`${styles.root} ${className}`}
    />
  );
};

export const ToastTitle = ({ children, className = "", ref, ...props }: ToastPrimitive.ToastTitleProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <ToastPrimitive.Title {...props} ref={ref} asChild>
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
};

export const ToastDescription = ({
  children,
  className = "",
  ref,
  ...props
}: ToastPrimitive.ToastDescriptionProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <ToastPrimitive.Description {...props} ref={ref} asChild>
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
};

export const ToastAction = ({ className = "", asChild, children, ref, ...props }: ToastPrimitive.ToastActionProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  return (
    <ToastPrimitive.Action
      {...props}
      asChild={asChild}
      ref={ref}
      className={`${styles.action} ${className}`}
    >
      {asChild
        ? children
        : React.Children.map(children, (child) =>
            typeof child === "string" || typeof child === "number" ? (
              <Text as="span" size="sm" weight="medium">
                {child}
              </Text>
            ) : (
              child
            )
          )}
    </ToastPrimitive.Action>
  );
};

export const ToastClose = ({ className = "", ref, ...props }: ToastPrimitive.ToastCloseProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  return (
    <ToastPrimitive.Close
      aria-label="Dismiss"
      {...props}
      ref={ref}
      className={`${styles.close} ${className}`}
    >
      <SFSymbol symbol="✕" size="sm" />
    </ToastPrimitive.Close>
  );
};
