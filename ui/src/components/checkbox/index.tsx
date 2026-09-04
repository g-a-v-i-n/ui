import styles from "./styles.module.css";
import { SFSymbol } from "../sf-symbol";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { cx } from "../../lib/cx";

// NB: https://www.radix-ui.com/primitives/docs/components/checkbox#api-reference

export const Checkbox = ({
  checked,
  onCheckedChange,
  id,
  className,
  ...props
}: CheckboxPrimitive.CheckboxProps) => {
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
        <SFSymbol symbol="✓" size="md" weight="semibold" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
};
