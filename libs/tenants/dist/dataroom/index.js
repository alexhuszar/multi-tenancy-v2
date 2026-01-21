import { dataroomThemeConfig } from './theme';
import { dataroomFeatures } from './features';
import { dataroomBranding } from './branding';
export const dataroomConfig = {
    id: 'dataroom',
    themeConfig: dataroomThemeConfig,
    features: dataroomFeatures,
    branding: dataroomBranding
};
export function getDataroomSettings() {
    return {
        theme: {
            tokenOverrides: dataroomThemeConfig.tokenOverrides,
            semanticOverrides: dataroomThemeConfig.semanticOverrides,
            defaultMode: 'light'
        },
        features: dataroomFeatures,
        branding: dataroomBranding
    };
}
export { dataroomThemeConfig } from './theme';
export { dataroomFeatures } from './features';
export { dataroomBranding } from './branding';

//# sourceMappingURL=index.js.map