import * as React from 'react';
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form';

/**
 * Minimal shadcn-compatible Form primitives built on react-hook-form.
 * Exports: Form, FormField, FormItem, FormLabel, FormControl, FormMessage
 */

export const Form = FormProvider as unknown as React.FC<React.PropsWithChildren<any>>;

type FormFieldContextValue = { name: string };
const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);
export const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const formContext = useFormContext();
  const fieldState = fieldContext ? formContext.getFieldState(fieldContext.name) : undefined;
  return { name: fieldContext?.name, formMessage: (fieldState?.error?.message as string) || '' };
};

export function FormField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
  props: ControllerProps<TFieldValues, TName>
) {
  return (
    <FormFieldContext.Provider value={{ name: String(props.name) }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

export function FormItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['space-y-2', className].filter(Boolean).join(' ')} {...props} />;
}

export function FormLabel(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={['text-sm font-medium leading-none', props.className].filter(Boolean).join(' ')} {...props} />;
}

export function FormControl({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function FormMessage({ className }: { className?: string }) {
  const { formMessage } = useFormField();
  if (!formMessage) return null;
  return <p className={['text-sm text-red-600', className].filter(Boolean).join(' ')}>{formMessage}</p>;
}
