import React from "react";
import { HoverCard as HoverCardPrimitive } from "radix-ui";
import styles from "./styles.module.css";

export const HoverCardRoot = ({
  openDelay = 300,
  closeDelay = 100,
  ...props
}: HoverCardPrimitive.HoverCardProps) => (
  <HoverCardPrimitive.Root
    openDelay={openDelay}
    closeDelay={closeDelay}
    {...props}
  />
);

export const HoverCardPortal = HoverCardPrimitive.Portal;

export const HoverCardTrigger = (
  props: HoverCardPrimitive.HoverCardTriggerProps
) => <HoverCardPrimitive.Trigger asChild {...props} />;

export const HoverCardContent = ({
  children,
  className = "",
  sideOffset = 6,
  collisionPadding = 12,
  width = "auto",
  ref,
  ...props
}: HoverCardPrimitive.HoverCardContentProps & {
  width?: "sm" | "md" | "lg" | "auto";
} & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        {...props}
        ref={ref}
        data-width={width}
        className={`${styles.content} ${className}`}
      >
        {children}
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  );
};
