'use client';

import { forwardRef, useState } from 'react';
import { Input } from '../..';

type InputProps = React.ComponentPropsWithoutRef<typeof Input>;

type PasswordFieldProps = Omit<
  InputProps,
  'type' | 'endAdornment' | 'label'
> & {
  name: 'password' | 'confirmPassword';
  label?: string;
  showToggle?: boolean;
  showText?: string;
  hideText?: string;
};

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    {
      name,
      showToggle = true,
      showText = 'Show',
      hideText = 'Hide',
      label = 'Password',
      ...otherProps
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
      setIsVisible((prev) => !prev);
    };

    return (
      <Input
        {...otherProps}
        ref={ref}
        type={isVisible ? 'text' : 'password'}
        data-password
        endAdornment={
          showToggle ? (
            <button
              type="button"
              onClick={toggleVisibility}
              aria-pressed={isVisible}
              data-password-toggle
            >
              {isVisible ? hideText : showText}
            </button>
          ) : undefined
        }
        label={label}
      />
    );
  },
);
PasswordField.displayName = 'PasswordField';
