import { Form as FormPrimitive } from "radix-ui";
import { Text } from "../text";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import { styled } from "../../lib/styled";
import type { PropsOf } from "../../lib/props";

export const FormRoot = FormPrimitive.Root;
export type FormRootProps = PropsOf<typeof FormRoot>;

export type FormValidityStateProps = PropsOf<typeof FormPrimitive.ValidityState>;

export const FormValidityState = (
  props: FormValidityStateProps
) => <FormPrimitive.ValidityState {...props} />;

export const FormField = styled(FormPrimitive.Field, styles.field, "FormField");
export type FormFieldProps = PropsOf<typeof FormField>;

export type FormLabelProps = PropsOf<typeof FormPrimitive.Label>;

export const FormLabel = ({ children, className, ref, ...props }: FormLabelProps) => {
  return (
    <FormPrimitive.Label {...props} ref={ref} asChild>
      <Text
        as="label"
        size="sm"
        weight="medium"
        color="primary"
        className={className}
      >
        {children}
      </Text>
    </FormPrimitive.Label>
  );
};

export type FormControlProps = PropsOf<typeof FormPrimitive.Control>;

export const FormControl = (props: FormControlProps) => (
  <FormPrimitive.Control asChild {...props} />
);

export type FormMessageProps = PropsOf<typeof FormPrimitive.Message>;

export const FormMessage = ({ children, className, ref, ...props }: FormMessageProps) => {
  return (
    <FormPrimitive.Message
      {...props}
      ref={ref}
      className={cx(styles.message, className)}
    >
      <Text as="span" size="xs">
        {children}
      </Text>
    </FormPrimitive.Message>
  );
};

export type FormSubmitProps = PropsOf<typeof FormPrimitive.Submit>;

export const FormSubmit = (props: FormSubmitProps) => (
  <FormPrimitive.Submit asChild {...props} />
);
