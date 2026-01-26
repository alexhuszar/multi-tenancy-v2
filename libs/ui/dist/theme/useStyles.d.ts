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
export declare function useStyles(): StyleAdapter;
//# sourceMappingURL=useStyles.d.ts.map