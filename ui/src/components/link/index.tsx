import React from "react";
import styles from "./styles.module.css";

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

/* Inline link — inherits font size/family/line-height from the surrounding
   text (e.g. a parent <Text>), adding only color, weight, and underline. */
export const Link = ({ className = "", ref, ...props }: LinkProps & { ref?: React.Ref<HTMLAnchorElement> }) => {
  return (
    <a
      {...props}
      ref={ref}
      className={`${styles.link} ${className}`}
    />
  );
};
