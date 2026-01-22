'use client';

import { useMemo, ReactNode } from 'react';
import { ThemeContext, ThemeContextValue } from './ThemeContext';
import type { StyleAdapter } from '../adapters/types';
import type { DesignTokens } from '../tokens/types';
import { defaultDesignTokens } from '../tokens/defaults';

export interface ThemeProviderProps {
  adapter: StyleAdapter;
  tokens?: DesignTokens;
  children: ReactNode;
}

export const ThemeProvider = ({
  adapter,
  tokens = defaultDesignTokens,
  children,
}: ThemeProviderProps) => {
  const value = useMemo<ThemeContextValue>(
    () => ({ adapter, tokens }),
    [adapter, tokens],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

ThemeProvider.displayName = 'ThemeProvider';
