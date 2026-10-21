import React from "react";
import { Toggle as TogglePrimitive } from "radix-ui";
import styles from "./styles.module.css";
import { wrapTextChildren } from "../text/wrap";
import { cx } from "../../lib/cx";
import type { PropsOf } from "../../lib/props";

export type ToggleProps = PropsOf<typeof TogglePrimitive.Root> & {
  width?: "hug" | "square";
};

export const Toggle = ({
  children,
  className,
  width = "hug",
  ref,
  ...props
}: ToggleProps) => {
  return (
    <TogglePrimitive.Root
      {...props}
      ref={ref}
      data-width={width}
      className={cx(styles.toggle, className)}
    >
      {wrapTextChildren(children)}
    </TogglePrimitive.Root>
  );
};
