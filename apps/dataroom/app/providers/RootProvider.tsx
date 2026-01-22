'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@multi-tenancy/design-system';
import { tailwindAdapter } from '@multi-tenancy/design-system/adapters/tailwind';
import { ToastRenderer } from './ToastRenderer';

interface RootProviderProps {
  children: ReactNode;
}

export const RootProvider = ({ children }: RootProviderProps) => {
  return (
    <ThemeProvider adapter={tailwindAdapter}>
      <ToastRenderer>{children}</ToastRenderer>
    </ThemeProvider>
  );
};
