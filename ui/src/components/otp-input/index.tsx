import React from "react";
// NOTE: this is an `unstable_` Radix export (radix-ui@1.5.0) — the API may
// change across Radix versions. Keep that dependency isolated to this wrapper.
import { unstable_OneTimePasswordField as OTPField } from "radix-ui";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";

type OTPInputProps = OTPField.OneTimePasswordFieldProps & {
  /** Number of digit slots. */
  length?: number;
  /** When set, renders a hidden input so the value submits with a form. */
  name?: string;
};

export const OTPInput = ({
  length = 6,
  name,
  className,
  ref,
  ...props
}: OTPInputProps) => {
  return (
    <OTPField.Root
      {...props}
      ref={ref}
      name={name}
      className={cx(styles.root, className)}
    >
      {Array.from({ length }, (_, i) => (
        <OTPField.Input key={i} className={styles.slot} />
      ))}
      {name && <OTPField.HiddenInput name={name} />}
    </OTPField.Root>
  );
};
