import React from "react";
import { Toggle as TogglePrimitive } from "radix-ui";
import styles from "./styles.module.css";
import { wrapTextChildren } from "../text/wrap";
import { cx } from "../../lib/cx";

export const Toggle = ({
  children,
  className,
  width = "hug",
  ref,
  ...props
}: TogglePrimitive.ToggleProps & { width?: "hug" | "square" } & { ref?: React.Ref<HTMLButtonElement> }) => {
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
