import { dataroomConfig, getDataroomSettings } from './dataroom';
import { cryptocurrencyConfig, getCryptocurrencySettings } from './cryptocurrency';
import { defaultConfig, getDefaultSettings } from './default';
const tenantRegistry = new Map([
    [
        'dataroom',
        {
            id: 'dataroom',
            themeConfig: dataroomConfig.themeConfig,
            getSettings: getDataroomSettings
        }
    ],
    [
        'cryptocurrency',
        {
            id: 'cryptocurrency',
            themeConfig: cryptocurrencyConfig.themeConfig,
            getSettings: getCryptocurrencySettings
        }
    ],
    [
        'default',
        {
            id: 'default',
            themeConfig: defaultConfig.themeConfig,
            getSettings: getDefaultSettings
        }
    ]
]);
/**
 * Gets tenant configuration by ID
 */ export function getTenantConfig(tenantId) {
    return tenantRegistry.get(tenantId);
}
/**
 * Gets tenant settings by ID, falls back to default
 */ export function getTenantSettings(tenantId) {
    var _tenantRegistry_get;
    const entry = (_tenantRegistry_get = tenantRegistry.get(tenantId)) != null ? _tenantRegistry_get : tenantRegistry.get('default');
    if (!entry) {
        throw new Error(`Tenant not found: ${tenantId}`);
    }
    return entry.getSettings();
}
/**
 * Gets all registered tenant IDs
 */ export function getRegisteredTenantIds() {
    return Array.from(tenantRegistry.keys());
}
/**
 * Registers a new tenant configuration
 */ export function registerTenant(entry) {
    tenantRegistry.set(entry.id, entry);
}

//# sourceMappingURL=registry.js.map