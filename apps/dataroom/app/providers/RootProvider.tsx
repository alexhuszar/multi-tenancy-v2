'use client';

import { ReactNode } from 'react';
import { ToastRenderer } from './ToastRenderer';
import { ThemeProvider } from './ThemeProvider';
import { AuthProvider } from '../core/auth/AuthContext';
import { SessionProvider } from 'next-auth/react';

interface RootProviderProps {
  children: ReactNode;
}

export const RootProvider = ({ children }: RootProviderProps) => {
  return (
    <ThemeProvider>
      <ToastRenderer>
        <SessionProvider>
          <AuthProvider>{children}</AuthProvider>
        </SessionProvider>
      </ToastRenderer>
    </ThemeProvider>
  );
};
