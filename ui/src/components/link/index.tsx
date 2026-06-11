import React, { type Ref } from "react";
import styles from "./styles.module.css";

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

/* Inline link — inherits font size/family/line-height from the surrounding
   text (e.g. a parent <Text>), adding only color, weight, and underline. */
export const Link = React.forwardRef(
  (
    { className = "", ...props }: LinkProps,
    forwardedRef: Ref<HTMLAnchorElement> | undefined
  ) => {
    return (
      <a
        {...props}
        ref={forwardedRef}
        className={`${styles.link} ${className}`}
      />
    );
  }
);

Link.displayName = "Link";
