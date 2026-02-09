import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { useFormField } from './useFormField';
import { cn } from '../..';

export const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {
    errorClassName?: string;
  }
>(({ errorClassName, className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <LabelPrimitive.Root
      ref={ref}
      htmlFor={formItemId}
      className={cn(error && errorClassName, className)}
      {...props}
    />
  );
});
FormLabel.displayName = LabelPrimitive.Root.displayName;
