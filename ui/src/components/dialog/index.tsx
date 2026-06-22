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
  shakeOnInteractOutside = false,
  onPointerDownOutside,
  ref,
  ...props
}: DialogPrimitive.DialogContentProps & {
  /** Refuse scrim/outside-click dismissal with a side-to-side "no" shake. */
  shakeOnInteractOutside?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const innerRef = React.useRef<HTMLDivElement | null>(null);
  const shakeAnim = React.useRef<Animation | null>(null);

  const setRefs = (node: HTMLDivElement | null) => {
    innerRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) (ref as React.RefObject<HTMLDivElement | null>).current = node;
  };

  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content
        {...props}
        ref={setRefs}
        onPointerDownOutside={(event) => {
          if (shakeOnInteractOutside) {
            // Refuse the dismiss; shake "no" instead of closing. WAAPI overrides
            // the centering transform only while running, then settles back.
            event.preventDefault();
            const el = innerRef.current;
            if (
              el &&
              !window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ) {
              shakeAnim.current?.cancel();
              shakeAnim.current = el.animate(
                [
                  { transform: "translate(-50%, -50%) translateX(0)" },
                  { transform: "translate(-50%, -50%) translateX(-8px)" },
                  { transform: "translate(-50%, -50%) translateX(7px)" },
                  { transform: "translate(-50%, -50%) translateX(-5px)" },
                  { transform: "translate(-50%, -50%) translateX(3px)" },
                  { transform: "translate(-50%, -50%) translateX(0)" },
                ],
                { duration: 360, easing: "ease-in-out" }
              );
            }
          }
          onPointerDownOutside?.(event);
        }}
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
