import type { TenantSettings } from '@multi-tenancy/types';
export declare const dataroomConfig: {
    id: string;
    themeConfig: import("@multi-tenancy/types").TenantThemeConfig;
    features: import("@multi-tenancy/types").FeatureFlag[];
    branding: import("@multi-tenancy/types").TenantBrandingSettings;
};
export declare function getDataroomSettings(): TenantSettings;
export { dataroomThemeConfig } from './theme';
export { dataroomFeatures } from './features';
export { dataroomBranding } from './branding';
//# sourceMappingURL=index.d.ts.map