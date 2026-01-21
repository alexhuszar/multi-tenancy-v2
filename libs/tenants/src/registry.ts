import type { TenantSettings, TenantThemeConfig } from '@multi-tenancy/types';
import { dataroomConfig, getDataroomSettings } from './dataroom';
import { cryptocurrencyConfig, getCryptocurrencySettings } from './cryptocurrency';
import { defaultConfig, getDefaultSettings } from './default';

export interface TenantRegistryEntry {
  id: string;
  themeConfig: TenantThemeConfig;
  getSettings: () => TenantSettings;
}

const tenantRegistry: Map<string, TenantRegistryEntry> = new Map([
  [
    'dataroom',
    {
      id: 'dataroom',
      themeConfig: dataroomConfig.themeConfig,
      getSettings: getDataroomSettings,
    },
  ],
  [
    'cryptocurrency',
    {
      id: 'cryptocurrency',
      themeConfig: cryptocurrencyConfig.themeConfig,
      getSettings: getCryptocurrencySettings,
    },
  ],
  [
    'default',
    {
      id: 'default',
      themeConfig: defaultConfig.themeConfig,
      getSettings: getDefaultSettings,
    },
  ],
]);

/**
 * Gets tenant configuration by ID
 */
export function getTenantConfig(
  tenantId: string
): TenantRegistryEntry | undefined {
  return tenantRegistry.get(tenantId);
}

/**
 * Gets tenant settings by ID, falls back to default
 */
export function getTenantSettings(tenantId: string): TenantSettings {
  const entry = tenantRegistry.get(tenantId) ?? tenantRegistry.get('default');
  if (!entry) {
    throw new Error(`Tenant not found: ${tenantId}`);
  }
  return entry.getSettings();
}

/**
 * Gets all registered tenant IDs
 */
export function getRegisteredTenantIds(): string[] {
  return Array.from(tenantRegistry.keys());
}

/**
 * Registers a new tenant configuration
 */
export function registerTenant(entry: TenantRegistryEntry): void {
  tenantRegistry.set(entry.id, entry);
}
