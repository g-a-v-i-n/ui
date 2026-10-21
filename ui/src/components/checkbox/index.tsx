import styles from "./styles.module.css";
import { CheckIcon } from "../icon/static/check";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { cx } from "../../lib/cx";
import type { PropsOf } from "../../lib/props";

// NB: https://www.radix-ui.com/primitives/docs/components/checkbox#api-reference

export type CheckboxProps = PropsOf<typeof CheckboxPrimitive.Root>;

export const Checkbox = ({
  checked,
  onCheckedChange,
  id,
  className,
  ...props
}: CheckboxProps) => {
  return (
    <CheckboxPrimitive.Root
      {...props}
      className={cx(styles.root, className)}
      checked={checked}
      onCheckedChange={onCheckedChange}
      id={id}
    >
      <div className={styles.fill} aria-hidden />
      <CheckboxPrimitive.Indicator className={styles.indicator}>
        <CheckIcon size="md" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
};
