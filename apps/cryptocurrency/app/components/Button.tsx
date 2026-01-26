'use client';

import { forwardRef } from 'react';
import {
  Button as PrimitiveButton,
  ButtonProps as PrimitiveButtonProps,
  cn,
} from '@multi-tenancy/design-system';

type ButtonProps = PrimitiveButtonProps & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

function getButtonStyles({
  variant = 'primary',
  size = 'md',
  disabled,
  loading,
  className,
}: {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}) {
  return cn(
    'btn',
    variant === 'primary' && 'btn-primary',
    variant === 'secondary' && 'btn-secondary',
    variant === 'outline' && 'btn-outline-primary',
    variant === 'ghost' && 'btn-link',
    size === 'sm' && 'btn-sm',
    size === 'lg' && 'btn-lg',
    disabled && 'disabled',
    loading && 'disabled',
    className,
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', className, disabled, ...props },
    ref,
  ) => {
    return (
      <PrimitiveButton
        ref={ref}
        className={getButtonStyles({ variant, size, disabled, className })}
        disabled={disabled}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
