import type { DesignTokens, SemanticTokens, Theme } from '@multi-tenancy/types';

type CSSVariableMap = Record<string, string>;

/**
 * Converts a nested token object to flat CSS variable map
 */
function flattenTokens(obj: object, prefix = ''): CSSVariableMap {
  const result: CSSVariableMap = {};

  for (const [key, value] of Object.entries(obj)) {
    const cssKey = prefix ? `${prefix}-${key}` : key;

    if (typeof value === 'object' && value !== null) {
      Object.assign(result, flattenTokens(value, cssKey));
    } else {
      result[`--${cssKey}`] = String(value);
    }
  }

  return result;
}

/**
 * Generates CSS variables from design tokens
 */
export function generateTokenVariables(tokens: DesignTokens): CSSVariableMap {
  return flattenTokens(tokens);
}

/**
 * Generates CSS variables from semantic tokens
 */
export function generateSemanticVariables(
  semantic: SemanticTokens
): CSSVariableMap {
  return flattenTokens(semantic, 'semantic');
}

/**
 * Generates a complete CSS variable string from a theme
 */
export function generateThemeCSS(theme: Theme): string {
  const tokenVars = generateTokenVariables(theme.tokens);
  const semanticVars = generateSemanticVariables(theme.semantic);

  const allVars = { ...tokenVars, ...semanticVars };

  const cssLines = Object.entries(allVars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');

  return `:root {\n${cssLines}\n}`;
}

/**
 * Generates CSS for a specific theme mode (for data-theme attribute)
 */
export function generateThemeModeCSS(theme: Theme, selector: string): string {
  const tokenVars = generateTokenVariables(theme.tokens);
  const semanticVars = generateSemanticVariables(theme.semantic);

  const allVars = { ...tokenVars, ...semanticVars };

  const cssLines = Object.entries(allVars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');

  return `${selector} {\n${cssLines}\n}`;
}

/**
 * Generates inline style object for runtime theme application
 */
export function generateThemeStyleObject(
  theme: Theme
): Record<string, string> {
  const tokenVars = generateTokenVariables(theme.tokens);
  const semanticVars = generateSemanticVariables(theme.semantic);

  return { ...tokenVars, ...semanticVars };
}
