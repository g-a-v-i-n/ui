import React, { type Ref } from "react";
import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import styles from "./styles.module.css";

export const CollapsibleRoot = CollapsiblePrimitive.Root;

export const CollapsibleTrigger = (
  props: CollapsiblePrimitive.CollapsibleTriggerProps
) => <CollapsiblePrimitive.Trigger asChild {...props} />;

export const CollapsibleContent = React.forwardRef(
  (
    {
      className = "",
      ...props
    }: CollapsiblePrimitive.CollapsibleContentProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <CollapsiblePrimitive.Content
        {...props}
        ref={forwardedRef}
        className={`${styles.content} ${className}`}
      />
    );
  }
);

CollapsibleContent.displayName = "CollapsibleContent";
