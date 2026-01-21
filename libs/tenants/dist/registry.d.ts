import type { TenantSettings, TenantThemeConfig } from '@multi-tenancy/types';
export interface TenantRegistryEntry {
    id: string;
    themeConfig: TenantThemeConfig;
    getSettings: () => TenantSettings;
}
/**
 * Gets tenant configuration by ID
 */
export declare function getTenantConfig(tenantId: string): TenantRegistryEntry | undefined;
/**
 * Gets tenant settings by ID, falls back to default
 */
export declare function getTenantSettings(tenantId: string): TenantSettings;
/**
 * Gets all registered tenant IDs
 */
export declare function getRegisteredTenantIds(): string[];
/**
 * Registers a new tenant configuration
 */
export declare function registerTenant(entry: TenantRegistryEntry): void;
//# sourceMappingURL=registry.d.ts.map