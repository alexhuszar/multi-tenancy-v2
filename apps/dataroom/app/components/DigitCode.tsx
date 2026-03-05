'use client';

import {
  DigitCode as PrimitiveDigitCode,
  DigitCodeProps as PrimitiveDigitCodeProps,
  cn,
} from '@multi-tenancy/design-system';

type DigitCodeProps = PrimitiveDigitCodeProps & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

const getDigitCodeWrapStyles = ({ className }: { className?: string }) =>
  cn('flex justify-center sm:justify-start gap-4 max-w-screen-xs', className);

const getDigitCodeInputStyles = ({
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
}) =>
  cn(
    'inline-flex items-center min-w-0 w-10 text-center justify-center font-medium rounded-md transition-colors min-w',
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
    size === 'sm' && 'h-8 px-2 text-sm',
    size === 'md' && 'h-10 px-3 text-base',
    size === 'lg' && 'h-12 px-4 text-lg',
    loading && 'cursor-wait',
    disabled && 'opacity-50 cursor-not-allowed',
    className,
  );

export const DigitCode = ({
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  ...props
}: DigitCodeProps) => {
  return (
    <PrimitiveDigitCode
      className={getDigitCodeWrapStyles({className})}
      inputClassName={getDigitCodeInputStyles({
        variant,
        size,
        disabled,
        className,
      })}
      disabled={disabled}
      {...props}
    />
  );
};
