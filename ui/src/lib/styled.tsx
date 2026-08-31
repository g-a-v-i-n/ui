import React from "react";
import { cx } from "./cx";

/**
 * Wrap a component (or intrinsic tag) so it always carries a base class while
 * passing every other prop — ref included, a regular prop since React 19 —
 * straight through. Replaces the hand-written one-liner wrappers around
 * radix primitives. `React.ComponentProps<C>` carries the ref for forwardRef
 * primitives, so the public prop types match the wrappers this replaces.
 */
export function styled<C extends React.ElementType>(
  Component: C,
  baseClassName: string,
  displayName: string
) {
  // SAFETY: TS cannot relate a rest-spread back to the generic ComponentProps<C>
  // inside JSX, so the component is widened for the render call only; the
  // public signature below stays precisely typed.
  const Base = Component as React.ElementType;
  const Styled = ({ className, ...props }: React.ComponentProps<C>) => (
    <Base {...props} className={cx(baseClassName, className)} />
  );
  Styled.displayName = displayName;
  return Styled;
}
