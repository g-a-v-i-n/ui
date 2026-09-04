import { useId } from "react";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";

const SIZE = 48;
const STROKE = 6;
const CIRCUMFERENCE = 15.91549430918952;

export const PieChart = ({
  percent = 0,
  className,
  ...props
}: Omit<React.ComponentProps<"svg">, "children"> & {
  percent: number;
}) => {
  const maskId = useId();
  const pct = Math.min(100, Math.max(0, percent || 0));
  // Round caps paint a dot even for a zero-length dash; square them at 0%.
  const linecap = pct === 0 ? "butt" : "round";
  const decorative =
    props["aria-hidden"] === true || props["aria-hidden"] === "true";
  return (
    <svg
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : `${pct}%`}
      width="24"
      height="24"
      {...props}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className={cx(styles.pie, className)}
    >
      {/* The fill arc's thicker silhouette is masked out of the track, so the
          gap around the arc is real transparency — no background-matched
          underlay to keep in sync with the surface behind the chart. */}
      <mask id={maskId}>
        <rect width={SIZE} height={SIZE} fill="white" />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={CIRCUMFERENCE}
          fill="none"
          stroke="black"
          strokeWidth={STROKE + 4}
          strokeDasharray={`${pct} ${100 - pct}`}
          strokeDashoffset="25"
          strokeLinecap={linecap}
          className={styles.cutout}
        />
      </mask>
      <circle
        cx={"50%"}
        cy={"50%"}
        r={CIRCUMFERENCE}
        fill="transparent"
        strokeWidth={STROKE}
        mask={`url(#${maskId})`}
        className={styles.track}
      />
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={CIRCUMFERENCE}
        fill="transparent"
        strokeWidth={STROKE}
        strokeDasharray={`${pct} ${100 - pct}`}
        strokeDashoffset="25"
        strokeLinecap={linecap}
        className={styles.fill}
      />
    </svg>
  );
};
