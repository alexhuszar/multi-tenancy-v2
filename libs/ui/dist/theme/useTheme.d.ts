import { ThemeContextValue } from './ThemeContext';
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
export declare function useTheme(): ThemeContextValue;
//# sourceMappingURL=useTheme.d.ts.map