import React from "react";
import { Avatar as AvatarPrimitive } from "radix-ui";
import { Text, type TextProps } from "../text";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import { styled } from "../../lib/styled";

/* Sized on the control height scale (the Button size prop), so an avatar
   lines up with a button or input of the same size. */
type Size = "xs" | "sm" | "md" | "lg" | "xl";

/* The fallback is composed separately from the root, so the root shares its
   size through context and the fallback picks a matching text size. */
const AvatarContext = React.createContext<{ size: Size }>({ size: "md" });

const fallbackTextSize = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
} satisfies Record<Size, TextProps["size"]>;

export const AvatarRoot = ({
  className,
  size = "md",
  children,
  ref,
  ...props
}: AvatarPrimitive.AvatarProps & {
  /** Control height, on the same scale as the Button size prop. */
  size?: Size;
} & { ref?: React.Ref<HTMLSpanElement> }) => {
  return (
    <AvatarContext.Provider value={{ size }}>
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
    </AvatarContext.Provider>
  );
};

export const AvatarImage = styled(AvatarPrimitive.Image, styles.image, "AvatarImage");

export const AvatarFallback = ({
  children,
  className,
  ref,
  ...props
}: AvatarPrimitive.AvatarFallbackProps & { ref?: React.Ref<HTMLSpanElement> }) => {
  const { size } = React.useContext(AvatarContext);
  return (
    <AvatarPrimitive.Fallback
      {...props}
      ref={ref}
      className={cx(styles.fallback, className)}
    >
      <Text as="span" size={fallbackTextSize[size]} weight="semibold" color="inherit">
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
  /** Control height, on the same scale as the Button size prop. */
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
