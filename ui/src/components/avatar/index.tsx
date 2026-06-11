import React, { type Ref } from "react";
import { Avatar as AvatarPrimitive } from "radix-ui";
import { Text } from "../text";
import styles from "./styles.module.css";

type Size = "sm" | "md" | "lg";

export const AvatarRoot = React.forwardRef(
  (
    {
      className = "",
      size = "md",
      ...props
    }: AvatarPrimitive.AvatarProps & { size?: Size },
    forwardedRef: Ref<HTMLSpanElement> | undefined
  ) => {
    return (
      <AvatarPrimitive.Root
        {...props}
        ref={forwardedRef}
        data-size={size}
        className={`${styles.root} ${className}`}
      />
    );
  }
);

AvatarRoot.displayName = "AvatarRoot";

export const AvatarImage = React.forwardRef(
  (
    { className = "", ...props }: AvatarPrimitive.AvatarImageProps,
    forwardedRef: Ref<HTMLImageElement> | undefined
  ) => {
    return (
      <AvatarPrimitive.Image
        {...props}
        ref={forwardedRef}
        className={`${styles.image} ${className}`}
      />
    );
  }
);

AvatarImage.displayName = "AvatarImage";

export const AvatarFallback = React.forwardRef(
  (
    {
      children,
      className = "",
      ...props
    }: AvatarPrimitive.AvatarFallbackProps,
    forwardedRef: Ref<HTMLSpanElement> | undefined
  ) => {
    return (
      <AvatarPrimitive.Fallback
        {...props}
        ref={forwardedRef}
        className={`${styles.fallback} ${className}`}
      >
        <Text as="span" size="xs" weight="medium" color="inherit">
          {children}
        </Text>
      </AvatarPrimitive.Fallback>
    );
  }
);

AvatarFallback.displayName = "AvatarFallback";

export const Avatar = ({
  src,
  alt,
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

Avatar.displayName = "Avatar";
