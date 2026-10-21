import { Dialog as DialogPrimitive } from "radix-ui";
import { Text } from "../text";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import { styled } from "../../lib/styled";
import { useAnimatedSize } from "../../lib/use-animated-size";
import type { PropsOf } from "../../lib/props";

export const DialogRoot = DialogPrimitive.Root;
export type DialogRootProps = PropsOf<typeof DialogRoot>;
export const DialogPortal = DialogPrimitive.Portal;
export type DialogPortalProps = PropsOf<typeof DialogPortal>;
export const DialogClose = DialogPrimitive.Close;
export type DialogCloseProps = PropsOf<typeof DialogClose>;

export type DialogTriggerProps = PropsOf<typeof DialogPrimitive.Trigger>;

export const DialogTrigger = (props: DialogTriggerProps) => (
  <DialogPrimitive.Trigger asChild {...props} />
);

export const DialogOverlay = styled(DialogPrimitive.Overlay, styles.overlay, "DialogOverlay");
export type DialogOverlayProps = PropsOf<typeof DialogOverlay>;

export type DialogContentProps = PropsOf<typeof DialogPrimitive.Content>;

/** The modal surface, centered over the scrim. It sizes to its content and
    tweens between sizes when that content changes. */
export const DialogContent = ({
  children,
  className,
  ref,
  ...props
}: DialogContentProps) => {
  const inner = useAnimatedSize();
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content
        {...props}
        ref={ref}
        className={cx(styles.content, className)}
      >
        <div>
          <div ref={inner} className={styles.inner}>
            {children}
          </div>
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
};

export type DialogTitleProps = PropsOf<typeof DialogPrimitive.Title>;

export const DialogTitle = ({ children, className, ref, ...props }: DialogTitleProps) => {
  return (
    <DialogPrimitive.Title {...props} ref={ref} asChild>
      <Text
        as="h2"
        size="lg"
        weight="semibold"
        color="primary"
        className={cx(styles.title, className)}
      >
        {children}
      </Text>
    </DialogPrimitive.Title>
  );
};

export type DialogFooterProps = PropsOf<"div">;

/** The action row at the foot of the surface, separated by a hairline. */
export const DialogFooter = styled("div", styles.footer, "DialogFooter");

export type DialogDescriptionProps = PropsOf<typeof DialogPrimitive.Description>;

export const DialogDescription = ({
  children,
  className,
  ref,
  ...props
}: DialogDescriptionProps) => {
  return (
    <DialogPrimitive.Description {...props} ref={ref} asChild>
      <Text
        as="p"
        size="sm"
        color="secondary"
        className={cx(styles.description, className)}
      >
        {children}
      </Text>
    </DialogPrimitive.Description>
  );
};
