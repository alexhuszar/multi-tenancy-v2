'use client';

import * as React from 'react';
import * as Label from '@radix-ui/react-label';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'children'> {
  label?: string;
  helperText?: string;
  error?: string;
  loading?: boolean;
  required?: boolean;
  endAdornment?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      loading = false,
      required = false,
      endAdornment,
      id,
      disabled,
      readOnly,
      className,
      type = 'text',
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? `input-${generatedId}`;
    const descriptionId = `${inputId}-description`;

    const isDisabled = disabled || loading;
    const hasError = Boolean(error);

    return (
      <div className={className} data-input-wrapper>
        {label &&<Label.Root htmlFor={inputId} data-label>
          {label}
          {required && (
            <span aria-hidden="true" data-required-indicator>
              *
            </span>
          )}
        </Label.Root>}

        <div data-input-container>
          <input
            ref={ref}
            id={inputId}
            type={type}
            required={required}
            disabled={isDisabled}
            readOnly={readOnly}
            aria-invalid={hasError || undefined}
            aria-describedby={error || helperText ? descriptionId : undefined}
            aria-errormessage={hasError ? descriptionId : undefined}
            aria-busy={loading || undefined}
            data-input
            {...props}
          />

          {endAdornment && <div data-input-adornment>{endAdornment}</div>}
        </div>

        {(error || helperText) && (
          <div
            id={descriptionId}
            data-description
            role={error ? 'alert' : undefined}
            aria-live={error ? 'assertive' : 'polite'}
          >
            {error ?? helperText}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
