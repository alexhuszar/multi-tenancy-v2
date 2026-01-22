'use client';

import { createContext } from 'react';
import type { StyleAdapter } from '../adapters/types';
import type { DesignTokens } from '../tokens/types';

export interface ThemeContextValue {
  adapter: StyleAdapter;
  tokens: DesignTokens;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
