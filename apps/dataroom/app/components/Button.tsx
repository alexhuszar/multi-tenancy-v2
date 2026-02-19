'use client';

import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
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
  return twMerge(
    cn(
      'inline-flex items-center justify-center font-medium rounded-md transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      variant === 'primary' &&
        'bg-primary text-white hover:bg-primary/90 focus:ring-primary',
      variant === 'secondary' &&
        'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
      variant === 'outline' &&
        'border border-gray-300 bg-transparent hover:bg-gray-50 focus:ring-gray-500',
      variant === 'ghost' &&
        'bg-transparent hover:bg-gray-100 focus:ring-gray-500',
      size === 'sm' && 'h-8 px-3 text-sm',
      size === 'md' && 'h-10 px-4 text-base',
      size === 'lg' && 'h-12 px-6 text-lg',
      loading && 'cursor-wait',
      disabled && 'opacity-50 cursor-not-allowed',
      className,
    ),
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
        className={getButtonStyles({
          variant,
          size,
          disabled,
          className,
          loading: props.isLoading,
        })}
        disabled={disabled}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
