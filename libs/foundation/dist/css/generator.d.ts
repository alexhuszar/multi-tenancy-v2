import type { DesignTokens, SemanticTokens, Theme } from '@multi-tenancy/types';
type CSSVariableMap = Record<string, string>;
/**
 * Generates CSS variables from design tokens
 */
export declare function generateTokenVariables(tokens: DesignTokens): CSSVariableMap;
/**
 * Generates CSS variables from semantic tokens
 */
export declare function generateSemanticVariables(semantic: SemanticTokens): CSSVariableMap;
/**
 * Generates a complete CSS variable string from a theme
 */
export declare function generateThemeCSS(theme: Theme): string;
/**
 * Generates CSS for a specific theme mode (for data-theme attribute)
 */
export declare function generateThemeModeCSS(theme: Theme, selector: string): string;
/**
 * Generates inline style object for runtime theme application
 */
export declare function generateThemeStyleObject(theme: Theme): Record<string, string>;
export {};
//# sourceMappingURL=generator.d.ts.map