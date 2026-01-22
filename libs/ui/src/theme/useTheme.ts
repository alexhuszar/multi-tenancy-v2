import { useContext } from 'react';
import { ThemeContext, ThemeContextValue } from './ThemeContext';

/**
 * Accesses the current theme context (adapter and tokens).
 *
 * @returns The ThemeContextValue containing the theme adapter and tokens.
 * @throws Error if the hook is called outside of a ThemeProvider.
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