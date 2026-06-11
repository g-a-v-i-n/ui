import React, { type Ref } from "react";
import { Form as FormPrimitive } from "radix-ui";
import { Text } from "../text";
import styles from "./styles.module.css";

export const FormRoot = FormPrimitive.Root;

export const FormValidityState = (
  props: FormPrimitive.FormValidityStateProps
) => <FormPrimitive.ValidityState {...props} />;

export const FormField = React.forwardRef(
  (
    { className = "", ...props }: FormPrimitive.FormFieldProps,
    forwardedRef: Ref<HTMLDivElement> | undefined
  ) => {
    return (
      <FormPrimitive.Field
        {...props}
        ref={forwardedRef}
        className={`${styles.field} ${className}`}
      />
    );
  }
);

FormField.displayName = "FormField";

export const FormLabel = React.forwardRef(
  (
    { children, className = "", ...props }: FormPrimitive.FormLabelProps,
    forwardedRef: Ref<HTMLLabelElement> | undefined
  ) => {
    return (
      <FormPrimitive.Label {...props} ref={forwardedRef} asChild>
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
  }
);

FormLabel.displayName = "FormLabel";

export const FormControl = (props: FormPrimitive.FormControlProps) => (
  <FormPrimitive.Control asChild {...props} />
);

export const FormMessage = React.forwardRef(
  (
    { children, className = "", ...props }: FormPrimitive.FormMessageProps,
    forwardedRef: Ref<HTMLSpanElement> | undefined
  ) => {
    return (
      <FormPrimitive.Message
        {...props}
        ref={forwardedRef}
        className={`${styles.message} ${className}`}
      >
        {children}
      </FormPrimitive.Message>
    );
  }
);

FormMessage.displayName = "FormMessage";

export const FormSubmit = (props: FormPrimitive.FormSubmitProps) => (
  <FormPrimitive.Submit asChild {...props} />
);
