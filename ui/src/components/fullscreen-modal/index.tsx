import React from "react";
import { Dialog as DialogPrimitive, VisuallyHidden } from "radix-ui";
import { Button } from "../button";
import { SFSymbol } from "../sf-symbol";
import { Tooltip } from "../tooltip";
import styles from "./styles.module.css";

export type FullscreenModalProps = {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  /* Tooltip must wrap the dialog trigger (not the other way around) so the
     trigger's props still reach the underlying button — pass it here. */
  triggerTooltip?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disableClose?: boolean;
  /** Announced to screen readers; rendered visually hidden. */
  title: string;
  description: string;
  hideCloseButton?: boolean;
  className?: string;
};

export const FullscreenModal = ({
  children,
  trigger,
  triggerTooltip,
  open,
  defaultOpen,
  onOpenChange,
  disableClose = false,
  title,
  description,
  hideCloseButton = false,
  className = "",
}: FullscreenModalProps) => {
  const dialogTrigger =
    trigger != null ? (
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
    ) : null;

  return (
    <DialogPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {dialogTrigger != null &&
        (triggerTooltip ? (
          <Tooltip content={triggerTooltip}>{dialogTrigger}</Tooltip>
        ) : (
          dialogTrigger
        ))}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={styles.overlay} />
        <DialogPrimitive.Content
          className={`${styles.content} ${className}`}
          onEscapeKeyDown={(e) => {
            if (disableClose) {
              e.preventDefault();
            }
          }}
        >
          <VisuallyHidden.Root>
            <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
            <DialogPrimitive.Description>
              {description}
            </DialogPrimitive.Description>
          </VisuallyHidden.Root>
          {!disableClose && !hideCloseButton && (
            <DialogPrimitive.Close asChild>
              <Button
                variant="secondary"
                width="square"
                round
                aria-label="Close"
                className={styles.close}
                prefixSlot={<SFSymbol symbol="✕" size="sm" />}
              />
            </DialogPrimitive.Close>
          )}
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
