import type React from "react";

/**
 * The props of a component or intrinsic tag, `ref` included. React 19 passes
 * `ref` as an ordinary prop, and `React.ComponentProps` carries it for both
 * intrinsic tags and forwardRef components (every Radix part), so a wrapper
 * that spreads onto one of those needs no hand-written `ref?: React.Ref<…>`.
 *
 *   type DialogTitleProps = PropsOf<typeof DialogPrimitive.Title>;
 *   type CardProps = PropsOf<"div"> & { variant?: Variant };
 */
export type PropsOf<C extends React.ElementType> = React.ComponentProps<C>;
