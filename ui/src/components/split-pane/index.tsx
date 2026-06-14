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

export const SplitPane = ({
  className = "",
  ref,
  ...props
}: SplitPaneProps & {
  /* allotment resolves its own bundled @types/react, so the ref prop type
     must come from Allotment itself rather than our React.Ref. */
  ref?: React.ComponentPropsWithRef<typeof Allotment>["ref"];
}) => {
  return (
    <Allotment
      {...props}
      ref={ref}
      className={`${styles.root} ${className}`}
    />
  );
};

/* Allotment recognizes panes by component identity (displayName), and panes
   are positioned internally — so the Pane must be passed through unwrapped. */
export const SplitPanePane: typeof Allotment.Pane = Allotment.Pane;
