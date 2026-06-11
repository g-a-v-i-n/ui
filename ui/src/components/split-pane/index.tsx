import React from "react";
import {
  Allotment,
  LayoutPriority,
  setSashSize,
  type AllotmentHandle,
  type AllotmentProps,
} from "allotment";
import "allotment/dist/style.css";
import styles from "./styles.module.css";

export type SplitPaneHandle = AllotmentHandle;
export type SplitPaneProps = AllotmentProps & { className?: string };
export type SplitPanePaneProps = React.ComponentProps<typeof Allotment.Pane>;

export { LayoutPriority, setSashSize };

export const SplitPane = React.forwardRef<AllotmentHandle, SplitPaneProps>(
  ({ className = "", ...props }, forwardedRef) => {
    return (
      <Allotment
        {...props}
        ref={forwardedRef}
        className={`${styles.root} ${className}`}
      />
    );
  }
);

SplitPane.displayName = "SplitPane";

/* Allotment recognizes panes by component identity (displayName), and panes
   are positioned internally — so the Pane must be passed through unwrapped. */
export const SplitPanePane: typeof Allotment.Pane = Allotment.Pane;
