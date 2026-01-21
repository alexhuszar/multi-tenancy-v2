import { _ as _extends } from "@swc/helpers/_/_extends";
/**
 * Converts a nested token object to flat CSS variable map
 */ function flattenTokens(obj, prefix = '') {
    const result = {};
    for (const [key, value] of Object.entries(obj)){
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
 */ export function generateTokenVariables(tokens) {
    return flattenTokens(tokens);
}
/**
 * Generates CSS variables from semantic tokens
 */ export function generateSemanticVariables(semantic) {
    return flattenTokens(semantic, 'semantic');
}
/**
 * Generates a complete CSS variable string from a theme
 */ export function generateThemeCSS(theme) {
    const tokenVars = generateTokenVariables(theme.tokens);
    const semanticVars = generateSemanticVariables(theme.semantic);
    const allVars = _extends({}, tokenVars, semanticVars);
    const cssLines = Object.entries(allVars).map(([key, value])=>`  ${key}: ${value};`).join('\n');
    return `:root {\n${cssLines}\n}`;
}
/**
 * Generates CSS for a specific theme mode (for data-theme attribute)
 */ export function generateThemeModeCSS(theme, selector) {
    const tokenVars = generateTokenVariables(theme.tokens);
    const semanticVars = generateSemanticVariables(theme.semantic);
    const allVars = _extends({}, tokenVars, semanticVars);
    const cssLines = Object.entries(allVars).map(([key, value])=>`  ${key}: ${value};`).join('\n');
    return `${selector} {\n${cssLines}\n}`;
}
/**
 * Generates inline style object for runtime theme application
 */ export function generateThemeStyleObject(theme) {
    const tokenVars = generateTokenVariables(theme.tokens);
    const semanticVars = generateSemanticVariables(theme.semantic);
    return _extends({}, tokenVars, semanticVars);
}

//# sourceMappingURL=generator.js.map