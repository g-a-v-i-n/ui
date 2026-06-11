import styles from "./styles.module.css";
import { SFSymbol } from "../sf-symbol";
import { Text } from "../text";
import { Checkbox as CheckboxPrimitive } from "radix-ui";

export type CheckboxRowProps = {
  label: string;
  id?: string;
  checked: boolean;
  onCheckedChange: (isChecked: boolean) => void;
  className?: string;
};

/* The row is a real <label> wrapping the checkbox button, so the whole row
   is one click target and the association is implicit — no htmlFor needed. */
export const CheckboxRow = ({
  label,
  id,
  checked,
  onCheckedChange,
  className = "",
}: CheckboxRowProps) => {
  return (
    <label className={`${styles.container} ${className}`}>
      <CheckboxPrimitive.Root
        className={styles.box}
        checked={checked}
        onCheckedChange={onCheckedChange}
        id={id}
      >
        <CheckboxPrimitive.Indicator className={styles.indicator}>
          <SFSymbol symbol="✓" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <Text
        as="span"
        size="sm"
        color={checked ? "primary" : "secondary"}
        className={styles.label}
      >
        {label}
      </Text>
    </label>
  );
};
