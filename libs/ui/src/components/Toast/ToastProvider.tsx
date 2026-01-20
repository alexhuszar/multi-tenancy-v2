import { ReactNode } from 'react';
import { Provider, Viewport } from '@radix-ui/react-toast';

export interface ToastProviderProps {
  viewPortClassName: string;
  children: ReactNode;

  duration?: number;
}

export const ToastProvider = ({
  children,
  viewPortClassName,
  duration = 5000,
}: ToastProviderProps) => {
  return (
    <Provider swipeDirection="right" duration={duration}>
      {children}
      <Viewport
        className={viewPortClassName}
        data-element="toast-viewport"
        data-testid="toast-viewport"
      />
    </Provider>
  );
};
