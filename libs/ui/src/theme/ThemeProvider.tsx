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
 * Theme Provider
 * Wraps the application to provide adapter and tokens via context
 *
 * @example
 * ```tsx
 * import { ThemeProvider } from '@multi-tenancy/design-system';
 * import { tailwindAdapter } from '@multi-tenancy/design-system/adapters/tailwind';
 *
 * export default function Layout({ children }) {
 *   return (
 *     <ThemeProvider adapter={tailwindAdapter}>
 *       {children}
 *     </ThemeProvider>
 *   );
 * }
 * ```
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
