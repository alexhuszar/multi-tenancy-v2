'use client';

import { ToastProvider as ToastProviderPrimitive } from '@multi-tenancy/design-system';
import { Toast } from '../components/Toast';
import { useToast, cn } from '@multi-tenancy/design-system';

function getToastViewportStyles({
  position = 'bottom-right',
  className,
}: {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}) {
  const positions = {
    'top-left': 'top-0 start-0',
    'top-right': 'top-0 end-0',
    'bottom-left': 'bottom-0 start-0',
    'bottom-right': 'bottom-0 end-0',
  };
  return cn(
    'toast-container position-fixed p-3',
    positions[position],
    className,
  );
}

export const ToastRenderer = ({ children }: { children: React.ReactNode }) => {
  const { toasts, dismiss } = useToast();

  return (
    <ToastProviderPrimitive
      viewPortClassName={getToastViewportStyles({ position: 'bottom-right' })}
    >
      {children}
      {toasts.map((t) => (
        <Toast
          key={t.id}
          variant={t.variant}
          title={t.title}
          subtitle={t.subtitle}
          duration={t.duration}
          action={t.action}
          open
          onOpenChange={(open) => !open && dismiss(t.id)}
        />
      ))}
    </ToastProviderPrimitive>
  );
};
