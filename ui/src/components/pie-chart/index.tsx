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
  return (
    <svg
      width="24"
      height="24"
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className={`${styles.pie} ${className}`}
      style={style}
    >
      <circle
        cx={"50%"}
        cy={"50%"}
        r={CIRCUMFERENCE}
        fill="transparent"
        strokeWidth={STROKE}
        className={styles.track}
      />
      <circle
        cx={"50%"}
        cy={"50%"}
        r={CIRCUMFERENCE}
        fill="transparent"
        strokeWidth={STROKE + 4}
        strokeDasharray={`${percent} ${100 - percent}`}
        strokeDashoffset="25"
        strokeLinecap="round"
        className={styles.underlay}
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
