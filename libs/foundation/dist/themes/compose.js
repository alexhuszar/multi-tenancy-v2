import { _ as _extends } from "@swc/helpers/_/_extends";
import { baseTokens } from '../tokens/base';
import { lightSemanticTokens } from '../tokens/semantic/light';
import { darkSemanticTokens } from '../tokens/semantic/dark';
/**
 * Deep merges token overrides with base tokens
 */ function deepMerge(base, override) {
    const result = _extends({}, base);
    for(const key in override){
        if (Object.prototype.hasOwnProperty.call(override, key)) {
            const baseValue = base[key];
            const overrideValue = override[key];
            if (typeof baseValue === 'object' && baseValue !== null && typeof overrideValue === 'object' && overrideValue !== null && !Array.isArray(baseValue)) {
                result[key] = deepMerge(baseValue, overrideValue);
            } else if (overrideValue !== undefined) {
                result[key] = overrideValue;
            }
        }
    }
    return result;
}
/**
 * Composes a theme from base tokens with optional tenant overrides
 */ export function composeTheme(config, mode = 'light') {
    const mergedTokens = config.tokenOverrides ? deepMerge(baseTokens, config.tokenOverrides) : baseTokens;
    const baseSemantic = mode === 'light' ? lightSemanticTokens : darkSemanticTokens;
    const mergedSemantic = config.semanticOverrides ? deepMerge(baseSemantic, config.semanticOverrides) : baseSemantic;
    return {
        name: config.tenantId,
        mode,
        tokens: mergedTokens,
        semantic: mergedSemantic
    };
}
/**
 * Creates both light and dark themes for a tenant
 */ export function createTenantThemes(config) {
    return {
        light: composeTheme(config, 'light'),
        dark: composeTheme(config, 'dark')
    };
}

//# sourceMappingURL=compose.js.map