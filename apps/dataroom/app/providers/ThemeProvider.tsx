'use client';

import { useEffect, ReactNode } from 'react';
import { useTheme } from '@multi-tenancy/design-system';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(resolvedTheme);
  }, [resolvedTheme]);

  return <>{children}</>;
};
