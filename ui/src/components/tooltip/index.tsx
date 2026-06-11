import { Tooltip as TooltipPrimitive } from "radix-ui";
import { Arrow } from "../arrow";
import { Text } from "../text";
import styles from "./styles.module.css";

export const TooltipProvider = TooltipPrimitive.Provider;

export type TooltipProps = {
  children?: React.ReactNode;
  content: React.ReactNode;
  open?: boolean;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  collisionPadding?: number;
  sideOffset?: number;
  onEscapeKeyDown?: () => void;
  onPointerDownOutside?: () => void;
} & TooltipPrimitive.TooltipProps;

export function Tooltip({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  side = "top",
  align = "center",
  collisionPadding = 12,
  sideOffset = 8,
  onEscapeKeyDown,
  onPointerDownOutside,
  ...props
}: TooltipProps) {
  if (!content) return <>{children}</>;
  return (
    <TooltipPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content
        side={side}
        align={align}
        collisionPadding={collisionPadding}
        sideOffset={sideOffset}
        onEscapeKeyDown={onEscapeKeyDown}
        onPointerDownOutside={onPointerDownOutside}
        {...props}
        asChild
      >
        <Text as="div" size="xs" className={styles.content}>
          {content}
          <TooltipPrimitive.Arrow asChild>
            <Arrow />
          </TooltipPrimitive.Arrow>
        </Text>
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  );
}
