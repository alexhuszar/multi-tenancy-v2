import { cryptocurrencyThemeConfig } from './theme';
import { cryptocurrencyFeatures } from './features';
import { cryptocurrencyBranding } from './branding';
export const cryptocurrencyConfig = {
    id: 'cryptocurrency',
    themeConfig: cryptocurrencyThemeConfig,
    features: cryptocurrencyFeatures,
    branding: cryptocurrencyBranding
};
export function getCryptocurrencySettings() {
    return {
        theme: {
            tokenOverrides: cryptocurrencyThemeConfig.tokenOverrides,
            semanticOverrides: cryptocurrencyThemeConfig.semanticOverrides,
            defaultMode: 'dark'
        },
        features: cryptocurrencyFeatures,
        branding: cryptocurrencyBranding
    };
}
export { cryptocurrencyThemeConfig } from './theme';
export { cryptocurrencyFeatures } from './features';
export { cryptocurrencyBranding } from './branding';

//# sourceMappingURL=index.js.map