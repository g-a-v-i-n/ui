import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import type { PropsOf } from "../../lib/props";

export type RadioProps = PropsOf<typeof RadioGroupPrimitive.Item>;

export const Radio = ({ className, ref, ...props }: RadioProps) => {
  return (
    <RadioGroupPrimitive.Item
      {...props}
      ref={ref}
      className={cx(styles.root, className)}
    >
      <RadioGroupPrimitive.Indicator className={styles.indicator} />
    </RadioGroupPrimitive.Item>
  );
};
