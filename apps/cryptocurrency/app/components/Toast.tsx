'use client';

import { ReactNode } from 'react';
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
  return cn(
    'toast show',
    variant === 'default' && 'bg-white text-dark',
    variant === 'success' &&
      'bg-success bg-opacity-10 text-success border-success',
    variant === 'error' && 'bg-danger bg-opacity-10 text-danger border-danger',
    variant === 'warning' &&
      'bg-warning bg-opacity-10 text-warning border-warning',
    className,
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
      contentClassName={cn(
        'd-flex flex-column bg-white rounded gap-2 justify-content-between w-100 ps-3',
        contentClassName,
      )}
      {...props}
    />
  );
}
