import styles from "./styles.module.css";
import { cx } from "../../lib/cx";

export function MiddleDot({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="10"
      height="10"
      aria-hidden="true"
      className={cx(styles.middleDot, className)}
    >
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}
