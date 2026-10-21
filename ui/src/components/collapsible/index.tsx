import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import styles from "./styles.module.css";
import { styled } from "../../lib/styled";
import type { PropsOf } from "../../lib/props";

export const CollapsibleRoot = CollapsiblePrimitive.Root;
export type CollapsibleRootProps = PropsOf<typeof CollapsibleRoot>;

export type CollapsibleTriggerProps = PropsOf<typeof CollapsiblePrimitive.Trigger>;

export const CollapsibleTrigger = (
  props: CollapsibleTriggerProps
) => <CollapsiblePrimitive.Trigger asChild {...props} />;

export const CollapsibleContent = styled(CollapsiblePrimitive.Content, styles.content, "CollapsibleContent");
export type CollapsibleContentProps = PropsOf<typeof CollapsibleContent>;
