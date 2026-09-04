import React from "react";
import { Avatar as AvatarPrimitive } from "radix-ui";
import { Text } from "../text";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import { styled } from "../../lib/styled";

type Size = "sm" | "md" | "lg";

export const AvatarRoot = ({
  className,
  size = "md",
  children,
  ref,
  ...props
}: AvatarPrimitive.AvatarProps & { size?: Size } & { ref?: React.Ref<HTMLSpanElement> }) => {
  return (
    <AvatarPrimitive.Root
      {...props}
      ref={ref}
      data-size={size}
      className={cx(styles.root, className)}
    >
      {children}
      {/* span, not div — the Radix root renders a <span>. Last child so it
          paints over the image/fallback. */}
      <span className={styles.rim} aria-hidden="true" />
    </AvatarPrimitive.Root>
  );
};

export const AvatarImage = styled(AvatarPrimitive.Image, styles.image, "AvatarImage");

export const AvatarFallback = ({
  children,
  className,
  ref,
  ...props
}: AvatarPrimitive.AvatarFallbackProps & { ref?: React.Ref<HTMLSpanElement> }) => {
  return (
    <AvatarPrimitive.Fallback
      {...props}
      ref={ref}
      className={cx(styles.fallback, className)}
    >
      <Text as="span" size="md" weight="medium" color="inherit">
        {children}
      </Text>
    </AvatarPrimitive.Fallback>
  );
};

export const Avatar = ({
  src,
  alt = "",
  fallback,
  delayMs,
  ...rootProps
}: AvatarPrimitive.AvatarProps & {
  size?: Size;
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  delayMs?: number;
}) => {
  return (
    <AvatarRoot {...rootProps}>
      {src && <AvatarImage src={src} alt={alt} />}
      {fallback != null && (
        <AvatarFallback delayMs={delayMs}>{fallback}</AvatarFallback>
      )}
    </AvatarRoot>
  );
};
