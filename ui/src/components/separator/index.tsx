import React from "react";
import { Separator as SeparatorPrimitive } from "radix-ui";
import styles from "./styles.module.css";
import { styled } from "../../lib/styled";
import type { PropsOf } from "../../lib/props";

export const Separator = styled(SeparatorPrimitive.Root, styles.root, "Separator");
export type SeparatorProps = PropsOf<typeof Separator>;
