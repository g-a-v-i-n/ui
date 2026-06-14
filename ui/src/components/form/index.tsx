import React from "react";
import { Form as FormPrimitive } from "radix-ui";
import { Text } from "../text";
import styles from "./styles.module.css";

export const FormRoot = FormPrimitive.Root;

export const FormValidityState = (
  props: FormPrimitive.FormValidityStateProps
) => <FormPrimitive.ValidityState {...props} />;

export const FormField = ({ className = "", ref, ...props }: FormPrimitive.FormFieldProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <FormPrimitive.Field
      {...props}
      ref={ref}
      className={`${styles.field} ${className}`}
    />
  );
};

export const FormLabel = ({ children, className = "", ref, ...props }: FormPrimitive.FormLabelProps & { ref?: React.Ref<HTMLLabelElement> }) => {
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

export const FormMessage = ({ children, className = "", ref, ...props }: FormPrimitive.FormMessageProps & { ref?: React.Ref<HTMLSpanElement> }) => {
  return (
    <FormPrimitive.Message
      {...props}
      ref={ref}
      className={`${styles.message} ${className}`}
    >
      {children}
    </FormPrimitive.Message>
  );
};

export const FormSubmit = (props: FormPrimitive.FormSubmitProps) => (
  <FormPrimitive.Submit asChild {...props} />
);
