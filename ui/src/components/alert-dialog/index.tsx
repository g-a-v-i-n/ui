import React from "react";
import { AlertDialog as AlertDialogPrimitive } from "radix-ui";
import { Button, type ButtonProps } from "../button";
import { Text } from "../text";
import styles from "./styles.module.css";

export const AlertDialogRoot = AlertDialogPrimitive.Root;
export const AlertDialogPortal = AlertDialogPrimitive.Portal;

export const AlertDialogTrigger = (
  props: AlertDialogPrimitive.AlertDialogTriggerProps
) => <AlertDialogPrimitive.Trigger asChild {...props} />;

export const AlertDialogOverlay = ({ className = "", ref, ...props }: AlertDialogPrimitive.AlertDialogOverlayProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <AlertDialogPrimitive.Overlay
      {...props}
      ref={ref}
      className={`${styles.overlay} ${className}`}
    />
  );
};

export const AlertDialogContent = ({
  children,
  className = "",
  ref,
  ...props
}: AlertDialogPrimitive.AlertDialogContentProps & { ref?: React.Ref<HTMLDivElement> }) => {
  const innerRef = React.useRef<HTMLDivElement | null>(null);
  const shakeAnim = React.useRef<Animation | null>(null);

  const setRefs = (node: HTMLDivElement | null) => {
    innerRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) (ref as React.RefObject<HTMLDivElement | null>).current = node;
  };

  // An alert dialog never dismisses on an outside click — shake "no" to make
  // that refusal felt. Animate the independent `translate` property so it
  // composes on top of the centering `transform`, not against it.
  const shakeNo = () => {
    const el = innerRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    shakeAnim.current?.cancel();
    shakeAnim.current = el.animate(
      [
        { translate: "0" },
        { translate: "-8px" },
        { translate: "7px" },
        { translate: "-5px" },
        { translate: "3px" },
        { translate: "0" },
      ],
      { duration: 360, easing: "ease-in-out" }
    );
  };

  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogOverlay onPointerDown={shakeNo} />
      <AlertDialogPrimitive.Content
        {...props}
        ref={setRefs}
        className={`${styles.content} ${className}`}
      >
        {children}
      </AlertDialogPrimitive.Content>
    </AlertDialogPrimitive.Portal>
  );
};

export const AlertDialogTitle = ({
  children,
  className = "",
  ref,
  ...props
}: AlertDialogPrimitive.AlertDialogTitleProps & { ref?: React.Ref<HTMLHeadingElement> }) => {
  return (
    <AlertDialogPrimitive.Title {...props} ref={ref} asChild>
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
};

export const AlertDialogDescription = ({
  children,
  className = "",
  ref,
  ...props
}: AlertDialogPrimitive.AlertDialogDescriptionProps & { ref?: React.Ref<HTMLParagraphElement> }) => {
  return (
    <AlertDialogPrimitive.Description {...props} ref={ref} asChild>
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
};

export const AlertDialogAction = ({
  children,
  variant = "primary",
  ref,
  ...props
}: AlertDialogPrimitive.AlertDialogActionProps & {
  variant?: ButtonProps["variant"];
} & { ref?: React.Ref<HTMLButtonElement> }) => {
  return (
    <AlertDialogPrimitive.Action {...props} ref={ref} asChild>
      <Button variant={variant}>{children}</Button>
    </AlertDialogPrimitive.Action>
  );
};

export const AlertDialogCancel = ({ children, ref, ...props }: AlertDialogPrimitive.AlertDialogCancelProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  return (
    <AlertDialogPrimitive.Cancel {...props} ref={ref} asChild>
      <Button variant="secondary">{children}</Button>
    </AlertDialogPrimitive.Cancel>
  );
};

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
