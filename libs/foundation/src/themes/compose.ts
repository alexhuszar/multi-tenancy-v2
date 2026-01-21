import type {
  DesignTokens,
  Theme,
  SemanticTokens,
  TenantThemeConfig,
  DeepPartial,
} from '@multi-tenancy/types';
import { baseTokens } from '../tokens/base';
import { lightSemanticTokens } from '../tokens/semantic/light';
import { darkSemanticTokens } from '../tokens/semantic/dark';

/**
 * Deep merges token overrides with base tokens
 */
function deepMerge<T extends object>(base: T, override: DeepPartial<T>): T {
  const result = { ...base } as T;

  for (const key in override) {
    if (Object.prototype.hasOwnProperty.call(override, key)) {
      const baseValue = base[key as keyof T];
      const overrideValue = override[key as keyof typeof override];

      if (
        typeof baseValue === 'object' &&
        baseValue !== null &&
        typeof overrideValue === 'object' &&
        overrideValue !== null &&
        !Array.isArray(baseValue)
      ) {
        result[key as keyof T] = deepMerge(
          baseValue as object,
          overrideValue as DeepPartial<typeof baseValue>
        ) as T[keyof T];
      } else if (overrideValue !== undefined) {
        result[key as keyof T] = overrideValue as T[keyof T];
      }
    }
  }

  return result;
}

/**
 * Composes a theme from base tokens with optional tenant overrides
 */
export function composeTheme(
  config: TenantThemeConfig,
  mode: 'light' | 'dark' = 'light'
): Theme {
  const mergedTokens: DesignTokens = config.tokenOverrides
    ? deepMerge(baseTokens, config.tokenOverrides)
    : baseTokens;

  const baseSemantic =
    mode === 'light' ? lightSemanticTokens : darkSemanticTokens;
  const mergedSemantic: SemanticTokens = config.semanticOverrides
    ? deepMerge(baseSemantic, config.semanticOverrides)
    : baseSemantic;

  return {
    name: config.tenantId,
    mode,
    tokens: mergedTokens,
    semantic: mergedSemantic,
  };
}

/**
 * Creates both light and dark themes for a tenant
 */
export function createTenantThemes(config: TenantThemeConfig): {
  light: Theme;
  dark: Theme;
} {
  return {
    light: composeTheme(config, 'light'),
    dark: composeTheme(config, 'dark'),
  };
}
