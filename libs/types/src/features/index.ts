// Type-safe feature flags

export const FEATURE_FLAGS = {
  DARK_MODE: 'dark-mode',
  ADVANCED_SEARCH: 'advanced-search',
  BULK_OPERATIONS: 'bulk-operations',
  ANALYTICS_DASHBOARD: 'analytics-dashboard',
  CUSTOM_BRANDING: 'custom-branding',
  API_ACCESS: 'api-access',
  SSO_LOGIN: 'sso-login',
  AUDIT_LOGS: 'audit-logs',
} as const;

export type FeatureFlag = (typeof FEATURE_FLAGS)[keyof typeof FEATURE_FLAGS];

export interface FeatureFlagConfig {
  flag: FeatureFlag;
  enabled: boolean;
  rolloutPercentage?: number;
  allowedTenants?: string[];
  blockedTenants?: string[];
}

export type FeatureFlagMap = Record<FeatureFlag, boolean>;
