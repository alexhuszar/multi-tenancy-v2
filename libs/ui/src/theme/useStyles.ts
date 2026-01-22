import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import type { StyleAdapter } from '../adapters/types';

/**
 * Retrieve the style adapter from the current theme context.
 *
 * @throws Error if called outside a ThemeProvider.
 * @returns The current theme's StyleAdapter.
 */
export function useStyles(): StyleAdapter {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useStyles must be used within a ThemeProvider. ' +
        'Make sure to wrap your app with <ThemeProvider adapter={...}>.'
    );
  }

  return context.adapter;
}