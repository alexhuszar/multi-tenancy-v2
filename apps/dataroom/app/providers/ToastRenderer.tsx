'use client';

import {
  ToastProvider as ToastProviderPrimitive,
  useStyles,
} from '@multi-tenancy/design-system';
import { Toast } from '../components/Toast';
import { useToast } from '@multi-tenancy/design-system';

export const ToastRenderer = ({ children }: { children: React.ReactNode }) => {
  const { toasts, dismiss } = useToast();
  const styles = useStyles();

  return (
    <ToastProviderPrimitive
      viewPortClassName={styles.getToastViewportStyles({
        position: 'bottom-right',
      })}
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

ToastRenderer.displayName = 'ToastRenderer';
