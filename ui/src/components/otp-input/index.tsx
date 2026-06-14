import React from "react";
// NOTE: this is an `unstable_` Radix export (radix-ui@1.5.0) — the API may
// change across Radix versions. Keep that dependency isolated to this wrapper.
import { unstable_OneTimePasswordField as OTPField } from "radix-ui";
import styles from "./styles.module.css";

type OTPInputProps = {
  /** Number of digit slots. */
  length?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** When set, renders a hidden input so the value submits with a form. */
  name?: string;
  disabled?: boolean;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
};

export const OTPInput = ({
  length = 6,
  value,
  defaultValue,
  onValueChange,
  name,
  disabled,
  className = "",
  ref,
}: OTPInputProps) => {
  return (
    <OTPField.Root
      ref={ref}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      className={`${styles.root} ${className}`}
    >
      {Array.from({ length }, (_, i) => (
        <OTPField.Input key={i} className={styles.slot} />
      ))}
      {name && <OTPField.HiddenInput name={name} />}
    </OTPField.Root>
  );
};
