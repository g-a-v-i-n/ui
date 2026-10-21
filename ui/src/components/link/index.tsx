import styles from "./styles.module.css";
import { styled } from "../../lib/styled";
import type { PropsOf } from "../../lib/props";

/* Inline link — inherits font size/family/line-height from the surrounding
   text (e.g. a parent <Text>), adding only color, weight, and underline. */
export const Link = styled("a", styles.link, "Link");
export type LinkProps = PropsOf<typeof Link>;
