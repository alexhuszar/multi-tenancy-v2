'use client';

import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import type { StyleAdapter } from '../adapters/types';

/**
 * useStyles Hook
 * Returns the style adapter from theme context
 *
 * @throws Error if used outside of ThemeProvider
 *
 * @example
 * ```tsx
 * const styles = useStyles();
 * const buttonClass = styles.getButtonStyles({ variant: 'primary', size: 'md' });
 * ```
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
