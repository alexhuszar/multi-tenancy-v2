import { defaultThemeConfig } from './theme';
import { defaultFeatures } from './features';
import { defaultBranding } from './branding';
export const defaultConfig = {
    id: 'default',
    themeConfig: defaultThemeConfig,
    features: defaultFeatures,
    branding: defaultBranding
};
export function getDefaultSettings() {
    return {
        theme: {
            tokenOverrides: defaultThemeConfig.tokenOverrides,
            semanticOverrides: defaultThemeConfig.semanticOverrides,
            defaultMode: 'system'
        },
        features: defaultFeatures,
        branding: defaultBranding
    };
}
export { defaultThemeConfig } from './theme';
export { defaultFeatures } from './features';
export { defaultBranding } from './branding';

//# sourceMappingURL=index.js.map