import React from "react";
import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import styles from "./styles.module.css";

export const CollapsibleRoot = CollapsiblePrimitive.Root;

export const CollapsibleTrigger = (
  props: CollapsiblePrimitive.CollapsibleTriggerProps
) => <CollapsiblePrimitive.Trigger asChild {...props} />;

export const CollapsibleContent = ({
  className = "",
  ref,
  ...props
}: CollapsiblePrimitive.CollapsibleContentProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <CollapsiblePrimitive.Content
      {...props}
      ref={ref}
      className={`${styles.content} ${className}`}
    />
  );
};
