import React from "react";
import { AnimatePresence, motion } from "motion/react";
import styles from "./styles.module.css";

export type IconSwapProps = {
  /** Identifies the current state; changing it animates children out and in. */
  swapKey: string | number | boolean;
  children?: React.ReactNode;
  /** Scale the outgoing/incoming children shrink to. */
  scale?: number;
  /** Animation duration in seconds. */
  duration?: number;
  mode?: "wait" | "popLayout" | "sync";
  className?: string;
  style?: React.CSSProperties;
};

/* Cross-fades children when swapKey changes — render the icon for the
   current state inside, keyed by that state:
   <IconSwap swapKey={muted}>{muted ? <SFSymbol …/> : <SFSymbol …/>}</IconSwap> */
export const IconSwap = ({
  swapKey,
  children,
  scale = 0.5,
  duration = 0.080, /* debug speed (--duration-debug: 2s); was 0.080 */
  mode = "wait",
  className = "",
  style,
}: IconSwapProps) => {
  return (
    <AnimatePresence mode={mode} initial={false}>
      <motion.span
        key={String(swapKey)}
        initial={{ opacity: 0, scale, filter: "blur(3px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale, filter: "blur(3px)" }}
        transition={{ duration, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`${styles.swap} ${className}`}
        style={style}
      >
        {children}
      </motion.span>
    </AnimatePresence>
  );
};
