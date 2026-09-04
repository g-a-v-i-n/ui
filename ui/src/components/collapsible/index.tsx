import React from "react";
import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import styles from "./styles.module.css";
import { styled } from "../../lib/styled";

export const CollapsibleRoot = CollapsiblePrimitive.Root;

export const CollapsibleTrigger = (
  props: CollapsiblePrimitive.CollapsibleTriggerProps
) => <CollapsiblePrimitive.Trigger asChild {...props} />;

export const CollapsibleContent = styled(CollapsiblePrimitive.Content, styles.content, "CollapsibleContent");
