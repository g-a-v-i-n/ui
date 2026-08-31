import React from "react";
import { Form as FormPrimitive } from "radix-ui";
import { Text } from "../text";
import styles from "./styles.module.css";
import { cx } from "../../lib/cx";
import { styled } from "../../lib/styled";

export const FormRoot = FormPrimitive.Root;

export const FormValidityState = (
  props: FormPrimitive.FormValidityStateProps
) => <FormPrimitive.ValidityState {...props} />;

export const FormField = styled(FormPrimitive.Field, styles.field, "FormField");

export const FormLabel = ({ children, className, ref, ...props }: FormPrimitive.FormLabelProps & { ref?: React.Ref<HTMLLabelElement> }) => {
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

export const FormControl = (props: FormPrimitive.FormControlProps) => (
  <FormPrimitive.Control asChild {...props} />
);

export const FormMessage = ({ children, className, ref, ...props }: FormPrimitive.FormMessageProps & { ref?: React.Ref<HTMLSpanElement> }) => {
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

export const FormSubmit = (props: FormPrimitive.FormSubmitProps) => (
  <FormPrimitive.Submit asChild {...props} />
);
