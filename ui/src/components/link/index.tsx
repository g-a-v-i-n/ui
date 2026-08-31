import React from "react";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import { styled } from "../../lib/styled";

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

/* Inline link — inherits font size/family/line-height from the surrounding
   text (e.g. a parent <Text>), adding only color, weight, and underline. */
export const Link = styled("a", styles.link, "Link");
