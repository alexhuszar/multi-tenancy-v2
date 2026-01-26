'use client';

import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { Toast as ToastPrimitive, cn } from '@multi-tenancy/design-system';

export interface ToastProps {
  variant?: 'default' | 'success' | 'error' | 'warning';
  title?: ReactNode;
  subtitle?: ReactNode;
  open?: boolean;
  onOpenChange: (open: boolean) => void;
  duration?: number;
  closeIcon?: ReactNode;
  action?: { component: ReactNode; altText: string };
  className?: string;
  contentClassName?: string;
}

function getToastStyles({
  variant = 'default',
  className,
}: {
  variant?: 'default' | 'success' | 'error' | 'warning';
  className?: string;
}) {
  return twMerge(
    cn(
      'flex gap-4 p-2 rounded-md shadow-lg border flex-col',
      variant === 'default' && 'bg-white border-gray-200 text-gray-900',
      variant === 'success' && 'bg-green-50 border-green-200 text-green-800',
      variant === 'error' && 'bg-red-50 border-red-200 text-red-800',
      variant === 'warning' && 'bg-yellow-50 border-yellow-200 text-yellow-800',
      className,
    ),
  );
}

export function Toast({
  variant = 'default',
  className,
  contentClassName,
  ...props
}: ToastProps) {
  return (
    <ToastPrimitive
      className={getToastStyles({ variant, className })}
      contentClassName={twMerge(
        cn(
          'flex flex-col bg-white text-sm rounded-md gap-2 justify-between w-full ps-3 [&>div]:flex [&>*:first-child]:flex-1 [&>*:first-child]:justify-between [&>*:first-child]:align-middle',
          contentClassName,
        ),
      )}
      {...props}
    />
  );
}
