'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import type { Theme, ThemeMode, TenantThemeConfig } from '@multi-tenancy/types';
import { composeTheme, generateThemeStyleObject } from '@multi-tenancy/foundation';

interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  resolvedMode: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: ReactNode;
  tenantConfig: TenantThemeConfig;
  defaultMode?: ThemeMode;
}

export function ThemeProvider({
  children,
  tenantConfig,
  defaultMode = 'system',
}: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);
  const [resolvedMode, setResolvedMode] = useState<'light' | 'dark'>('light');

  // Resolve system preference
  useEffect(() => {
    if (mode === 'system') {
      // Check if we're in browser
      if (typeof window === 'undefined') {
        setResolvedMode('light');
        return;
      }

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setResolvedMode(mediaQuery.matches ? 'dark' : 'light');

      const handler = (e: MediaQueryListEvent) => {
        setResolvedMode(e.matches ? 'dark' : 'light');
      };

      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }

    setResolvedMode(mode);
    return undefined;
  }, [mode]);

  // Compose theme based on resolved mode
  const theme = composeTheme(tenantConfig, resolvedMode);

  // Generate CSS variables style object
  const styleObject = generateThemeStyleObject(theme);

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode, resolvedMode }}>
      <div style={styleObject} data-theme={resolvedMode}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
