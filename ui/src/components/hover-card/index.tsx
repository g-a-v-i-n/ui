import { HoverCard as HoverCardPrimitive } from "radix-ui";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import type { PropsOf } from "../../lib/props";

export type HoverCardRootProps = HoverCardPrimitive.HoverCardProps;

export const HoverCardRoot = ({
  openDelay = 300,
  closeDelay = 100,
  ...props
}: HoverCardRootProps) => (
  <HoverCardPrimitive.Root
    openDelay={openDelay}
    closeDelay={closeDelay}
    {...props}
  />
);

export const HoverCardPortal = HoverCardPrimitive.Portal;
export type HoverCardPortalProps = PropsOf<typeof HoverCardPortal>;

export type HoverCardTriggerProps = HoverCardPrimitive.HoverCardTriggerProps;

export const HoverCardTrigger = (props: HoverCardTriggerProps) => <HoverCardPrimitive.Trigger asChild {...props} />;

export type HoverCardContentProps = PropsOf<typeof HoverCardPrimitive.Content> & {
  width?: "sm" | "md" | "lg" | "auto";
};

export const HoverCardContent = ({
  children,
  className,
  sideOffset = 6,
  collisionPadding = 12,
  width = "auto",
  ref,
  ...props
}: HoverCardContentProps) => {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        {...props}
        ref={ref}
        data-width={width}
        className={cx(styles.content, className)}
      >
        {children}
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  );
};
