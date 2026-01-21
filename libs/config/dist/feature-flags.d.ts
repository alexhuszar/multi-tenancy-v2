import type { FeatureFlag, FeatureFlagConfig, FeatureFlagMap } from '@multi-tenancy/types';
/**
 * Resolves feature flags for a specific tenant
 */
export declare function resolveFeatureFlags(tenantId: string, tenantFeatures?: FeatureFlag[], configOverrides?: FeatureFlagConfig[]): FeatureFlagMap;
/**
 * Type-safe feature flag checker
 */
export declare function createFeatureFlagChecker(flags: FeatureFlagMap): (flag: FeatureFlag) => boolean;
/**
 * Checks if a feature is enabled
 */
export declare function isFeatureEnabled(flags: FeatureFlagMap, flag: FeatureFlag): boolean;
//# sourceMappingURL=feature-flags.d.ts.map