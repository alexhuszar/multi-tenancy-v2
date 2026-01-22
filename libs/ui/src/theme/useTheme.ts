import { useContext } from 'react';
import { ThemeContext, ThemeContextValue } from './ThemeContext';

/**
 * useTheme Hook
 * Returns the full theme context (adapter + tokens)
 *
 * @throws Error if used outside of ThemeProvider
 *
 * @example
 * ```tsx
 * const { adapter, tokens } = useTheme();
 * const primaryColor = tokens.semantic.colors.primary.default;
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useTheme must be used within a ThemeProvider. ' +
        'Make sure to wrap your app with <ThemeProvider adapter={...}>.'
    );
  }

  return context;
}
