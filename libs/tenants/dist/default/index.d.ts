import type { TenantSettings } from '@multi-tenancy/types';
export declare const defaultConfig: {
    id: string;
    themeConfig: import("@multi-tenancy/types").TenantThemeConfig;
    features: import("@multi-tenancy/types").FeatureFlag[];
    branding: import("@multi-tenancy/types").TenantBrandingSettings;
};
export declare function getDefaultSettings(): TenantSettings;
export { defaultThemeConfig } from './theme';
export { defaultFeatures } from './features';
export { defaultBranding } from './branding';
//# sourceMappingURL=index.d.ts.map