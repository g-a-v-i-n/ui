import React from "react";
import { Separator as SeparatorPrimitive } from "radix-ui";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import { styled } from "../../lib/styled";

export const Separator = styled(SeparatorPrimitive.Root, styles.root, "Separator");
