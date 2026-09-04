import React from "react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import styles from "./styles.module.css";
import { styled } from "../../lib/styled";

export const RadioGroup = styled(RadioGroupPrimitive.Root, styles.group, "RadioGroup");
