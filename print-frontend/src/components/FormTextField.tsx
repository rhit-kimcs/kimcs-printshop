// cited form https://ui.shadcn.com/docs/forms/tanstack-form
import * as React from "react";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

type FormTextFieldProps = {
  field: AnyFieldApi;
  label: string;
  disabled?: boolean;
  placeholder?: string;
  autoComplete?: string;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
};

export function FormTextField({
  field,
  label,
  placeholder,
  disabled = false,
  autoComplete = "off",
  type = "text",
  className,
}: FormTextFieldProps) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid} className={className}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        type={type}
        value={(field.state.value ?? "") as string}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
