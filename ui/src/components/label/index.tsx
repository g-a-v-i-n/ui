import { Label as LabelPrimitive } from "radix-ui";
import { Text } from "../text";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import type { PropsOf } from "../../lib/props";

export type LabelProps = PropsOf<typeof LabelPrimitive.Root> & {
  size?: "xs" | "sm" | "md";
  weight?: "regular" | "medium" | "semibold";
  color?: "primary" | "secondary" | "tertiary" | "inherit";
};

export const Label = ({
  children,
  className,
  size = "sm",
  weight = "medium",
  color = "primary",
  ref,
  ...props
}: LabelProps) => {
  return (
    <LabelPrimitive.Root {...props} ref={ref} asChild>
      <Text
        as="label"
        size={size}
        weight={weight}
        color={color}
        className={cx(styles.label, className)}
      >
        {children}
      </Text>
    </LabelPrimitive.Root>
  );
};
