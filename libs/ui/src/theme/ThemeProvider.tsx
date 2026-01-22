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

/**
 * Provides a ThemeContext to descendants containing a style adapter and design tokens.
 *
 * The context value is stable and only updates when `adapter` or `tokens` change.
 *
 * @param adapter - The StyleAdapter used by descendant components to apply styles
 * @param tokens - Design tokens to expose via context; defaults to `defaultDesignTokens`
 * @param children - React nodes to render within the provider
 * @returns The ThemeContext provider element that renders `children`
 */
export function ThemeProvider({
  adapter,
  tokens = defaultDesignTokens,
  children,
}: ThemeProviderProps) {
  const value = useMemo<ThemeContextValue>(
    () => ({ adapter, tokens }),
    [adapter, tokens],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}