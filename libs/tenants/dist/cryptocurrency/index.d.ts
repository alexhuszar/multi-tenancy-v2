import type { TenantSettings } from '@multi-tenancy/types';
export declare const cryptocurrencyConfig: {
    id: string;
    themeConfig: import("@multi-tenancy/types").TenantThemeConfig;
    features: import("@multi-tenancy/types").FeatureFlag[];
    branding: import("@multi-tenancy/types").TenantBrandingSettings;
};
export declare function getCryptocurrencySettings(): TenantSettings;
export { cryptocurrencyThemeConfig } from './theme';
export { cryptocurrencyFeatures } from './features';
export { cryptocurrencyBranding } from './branding';
//# sourceMappingURL=index.d.ts.map