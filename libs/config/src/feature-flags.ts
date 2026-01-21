import type {
  FeatureFlag,
  FeatureFlagConfig,
  FeatureFlagMap,
} from '@multi-tenancy/types';
import { FEATURE_FLAGS } from '@multi-tenancy/types';

/**
 * Default feature flag configuration
 */
const defaultFeatureFlags: FeatureFlagConfig[] = [
  { flag: FEATURE_FLAGS.DARK_MODE, enabled: true },
  { flag: FEATURE_FLAGS.ADVANCED_SEARCH, enabled: false },
  { flag: FEATURE_FLAGS.BULK_OPERATIONS, enabled: false },
  { flag: FEATURE_FLAGS.ANALYTICS_DASHBOARD, enabled: false },
  { flag: FEATURE_FLAGS.CUSTOM_BRANDING, enabled: true },
  { flag: FEATURE_FLAGS.API_ACCESS, enabled: false },
  { flag: FEATURE_FLAGS.SSO_LOGIN, enabled: false },
  { flag: FEATURE_FLAGS.AUDIT_LOGS, enabled: false },
];

/**
 * Resolves feature flags for a specific tenant
 */
export function resolveFeatureFlags(
  tenantId: string,
  tenantFeatures: FeatureFlag[] = [],
  configOverrides: FeatureFlagConfig[] = []
): FeatureFlagMap {
  // Start with all flags disabled
  const result = Object.values(FEATURE_FLAGS).reduce((acc, flag) => {
    acc[flag] = false;
    return acc;
  }, {} as FeatureFlagMap);

  // Apply default configuration
  for (const config of defaultFeatureFlags) {
    if (config.enabled) {
      // Check tenant restrictions
      if (config.blockedTenants?.includes(tenantId)) continue;
      if (config.allowedTenants && !config.allowedTenants.includes(tenantId))
        continue;

      result[config.flag] = true;
    }
  }

  // Apply config overrides
  for (const config of configOverrides) {
    if (config.blockedTenants?.includes(tenantId)) {
      result[config.flag] = false;
      continue;
    }
    if (config.allowedTenants && !config.allowedTenants.includes(tenantId)) {
      result[config.flag] = false;
      continue;
    }
    result[config.flag] = config.enabled;
  }

  // Apply tenant-specific features (these always win)
  for (const feature of tenantFeatures) {
    result[feature] = true;
  }

  return result;
}

/**
 * Type-safe feature flag checker
 */
export function createFeatureFlagChecker(flags: FeatureFlagMap) {
  return function isFeatureEnabled(flag: FeatureFlag): boolean {
    return flags[flag] ?? false;
  };
}

/**
 * Checks if a feature is enabled
 */
export function isFeatureEnabled(
  flags: FeatureFlagMap,
  flag: FeatureFlag
): boolean {
  return flags[flag] ?? false;
}
