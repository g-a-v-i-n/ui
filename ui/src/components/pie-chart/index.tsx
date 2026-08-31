import { useId } from "react";
import styles from "./styles.module.css";

const SIZE = 48;
const STROKE = 6;
const CIRCUMFERENCE = 15.91549430918952;

export const PieChart = ({
  percent = 0,
  style,
  className = "",
}: {
  percent: number;
  style?: React.CSSProperties;
  className?: string;
}) => {
  const maskId = useId();
  return (
    <svg
      width="24"
      height="24"
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className={`${styles.pie} ${className}`}
      style={style}
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
          strokeDasharray={`${percent} ${100 - percent}`}
          strokeDashoffset="25"
          strokeLinecap="round"
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
        strokeDasharray={`${percent} ${100 - percent}`}
        strokeDashoffset="25"
        strokeLinecap="round"
        className={styles.fill}
      />
    </svg>
  );
};
