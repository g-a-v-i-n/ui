import styles from "./styles.module.css";
import { SFSymbol } from "../sf-symbol";
import { Checkbox as CheckboxPrimitive } from "radix-ui";

// NB: https://www.radix-ui.com/primitives/docs/components/checkbox#api-reference

export const Checkbox = ({
  checked,
  onCheckedChange,
  id,
  ...props
}: CheckboxPrimitive.CheckboxProps) => {
  return (
    <CheckboxPrimitive.Root
      {...props}
      className={styles.root}
      checked={checked}
      onCheckedChange={onCheckedChange}
      id={id}
    >
      <CheckboxPrimitive.Indicator className={styles.indicator}>
        <SFSymbol symbol="✓" size="md" weight="semibold" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
};
