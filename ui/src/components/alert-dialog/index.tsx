import { AlertDialog as AlertDialogPrimitive } from "radix-ui";
import { motion, useAnimationControls } from "motion/react";
import { Button, type ButtonProps } from "../button";
import { Text } from "../text";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import { useAnimatedSize } from "../../lib/use-animated-size";
import { styled } from "../../lib/styled";
import type { PropsOf } from "../../lib/props";

export const AlertDialogRoot = AlertDialogPrimitive.Root;
export type AlertDialogRootProps = PropsOf<typeof AlertDialogRoot>;
export const AlertDialogPortal = AlertDialogPrimitive.Portal;
export type AlertDialogPortalProps = PropsOf<typeof AlertDialogPortal>;

export type AlertDialogTriggerProps = PropsOf<typeof AlertDialogPrimitive.Trigger>;

export const AlertDialogTrigger = (
  props: AlertDialogTriggerProps
) => <AlertDialogPrimitive.Trigger asChild {...props} />;

export const AlertDialogOverlay = styled(AlertDialogPrimitive.Overlay, styles.overlay, "AlertDialogOverlay");
export type AlertDialogOverlayProps = PropsOf<typeof AlertDialogOverlay>;

export type AlertDialogContentProps = PropsOf<typeof AlertDialogPrimitive.Content>;

/** The modal surface, centered over the scrim. It sizes to its content and
    tweens between sizes when that content changes; an outside click shakes
    it instead of dismissing. */
export const AlertDialogContent = ({
  children,
  className,
  ref,
  ...props
}: AlertDialogContentProps) => {
  const controls = useAnimationControls();
  const inner = useAnimatedSize();

  // An alert dialog never dismisses on an outside click — shake "no" to make
  // that refusal felt. Animate the independent `translate` property (not
  // motion's `x`, which writes `transform`): the CSS enter/exit keyframes own
  // `transform` via fill-mode both, so a transform-based shake would never
  // paint. `translate` composes on top of the centering transform instead.
  const shakeNo = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    controls.stop();
    controls.start({
      translate: ["0px", "-8px", "7px", "-5px", "3px", "0px"],
      transition: { duration: 0.36, ease: "easeInOut" },
    });
  };

  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogOverlay onPointerDown={shakeNo} />
      <AlertDialogPrimitive.Content {...props} ref={ref} asChild>
        <motion.div
          animate={controls}
          className={cx(styles.content, className)}
        >
          <div>
            <div ref={inner} className={styles.inner}>
              {children}
            </div>
          </div>
        </motion.div>
      </AlertDialogPrimitive.Content>
    </AlertDialogPrimitive.Portal>
  );
};

export type AlertDialogTitleProps = PropsOf<typeof AlertDialogPrimitive.Title>;

export const AlertDialogTitle = ({
  children,
  className,
  ref,
  ...props
}: AlertDialogTitleProps) => {
  return (
    <AlertDialogPrimitive.Title {...props} ref={ref} asChild>
      <Text
        as="h2"
        size="lg"
        weight="semibold"
        color="primary"
        className={cx(styles.title, className)}
      >
        {children}
      </Text>
    </AlertDialogPrimitive.Title>
  );
};

export type AlertDialogDescriptionProps = PropsOf<typeof AlertDialogPrimitive.Description>;

export const AlertDialogDescription = ({
  children,
  className,
  ref,
  ...props
}: AlertDialogDescriptionProps) => {
  return (
    <AlertDialogPrimitive.Description {...props} ref={ref} asChild>
      <Text
        as="p"
        size="md"
        color="secondary"
        className={cx(styles.description, className)}
      >
        {children}
      </Text>
    </AlertDialogPrimitive.Description>
  );
};

export type AlertDialogActionProps = PropsOf<typeof AlertDialogPrimitive.Action> & {
  variant?: ButtonProps["variant"];
};

export const AlertDialogAction = ({
  children,
  variant = "primary",
  ref,
  ...props
}: AlertDialogActionProps) => {
  return (
    <AlertDialogPrimitive.Action {...props} ref={ref} asChild>
      <Button variant={variant}>{children}</Button>
    </AlertDialogPrimitive.Action>
  );
};

export type AlertDialogCancelProps = PropsOf<typeof AlertDialogPrimitive.Cancel>;

export const AlertDialogCancel = ({ children, ref, ...props }: AlertDialogCancelProps) => {
  return (
    <AlertDialogPrimitive.Cancel {...props} ref={ref} asChild>
      <Button variant="secondary">{children}</Button>
    </AlertDialogPrimitive.Cancel>
  );
};

export type AlertDialogFooterProps = PropsOf<"div">;

export const AlertDialogFooter = ({
  children,
  className,
  ...props
}: AlertDialogFooterProps) => {
  return (
    <div {...props} className={cx(styles.footer, className)}>
      {children}
    </div>
  );
};
