'use client';

import { ReactNode } from 'react';
import { ToastRenderer } from './ToastRenderer';
import { ThemeProvider } from './ThemeProvider';

interface RootProviderProps {
  children: ReactNode;
}

export const RootProvider = ({ children }: RootProviderProps) => {
  return (
    <ThemeProvider>
      <ToastRenderer>{children}</ToastRenderer>
    </ThemeProvider>
  );
};
