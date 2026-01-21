import type { Theme, TenantThemeConfig } from '@multi-tenancy/types';
/**
 * Composes a theme from base tokens with optional tenant overrides
 */
export declare function composeTheme(config: TenantThemeConfig, mode?: 'light' | 'dark'): Theme;
/**
 * Creates both light and dark themes for a tenant
 */
export declare function createTenantThemes(config: TenantThemeConfig): {
    light: Theme;
    dark: Theme;
};
//# sourceMappingURL=compose.d.ts.map