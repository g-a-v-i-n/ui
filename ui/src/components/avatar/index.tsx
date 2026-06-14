import React from "react";
import { Avatar as AvatarPrimitive } from "radix-ui";
import { Text } from "../text";
import styles from "./styles.module.css";

type Size = "sm" | "md" | "lg";

export const AvatarRoot = ({
  className = "",
  size = "md",
  ref,
  ...props
}: AvatarPrimitive.AvatarProps & { size?: Size } & { ref?: React.Ref<HTMLSpanElement> }) => {
  return (
    <AvatarPrimitive.Root
      {...props}
      ref={ref}
      data-size={size}
      className={`${styles.root} ${className}`}
    />
  );
};

export const AvatarImage = ({ className = "", ref, ...props }: AvatarPrimitive.AvatarImageProps & { ref?: React.Ref<HTMLImageElement> }) => {
  return (
    <AvatarPrimitive.Image
      {...props}
      ref={ref}
      className={`${styles.image} ${className}`}
    />
  );
};

export const AvatarFallback = ({
  children,
  className = "",
  ref,
  ...props
}: AvatarPrimitive.AvatarFallbackProps & { ref?: React.Ref<HTMLSpanElement> }) => {
  return (
    <AvatarPrimitive.Fallback
      {...props}
      ref={ref}
      className={`${styles.fallback} ${className}`}
    >
      <Text as="span" size="md" weight="medium" color="inherit">
        {children}
      </Text>
    </AvatarPrimitive.Fallback>
  );
};

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
