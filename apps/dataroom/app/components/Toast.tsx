'use client';

import { ReactNode } from 'react';
import {
  Toast as ToastPrimitive,
  useStyles,
} from '@multi-tenancy/design-system';

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

export function Toast({
  variant = 'default',
  className,
  contentClassName,
  ...props
}: ToastProps) {
  const styles = useStyles();

  return (
    <ToastPrimitive
      className={styles.getToastStyles({ variant, className })}
      contentClassName={styles.cn(
        'flex flex-col bg-white text-sm rounded-md gap-2 justify-between w-full ps-3 [&>div]:flex  [&>*:first-child]:flex-1 [&>*:first-child]:justify-between [&>*:first-child]:align-middle',
        contentClassName,
      )}
      {...props}
    />
  );
}
