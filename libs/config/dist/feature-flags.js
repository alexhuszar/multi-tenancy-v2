import { FEATURE_FLAGS } from '@multi-tenancy/types';
/**
 * Default feature flag configuration
 */ const defaultFeatureFlags = [
    {
        flag: FEATURE_FLAGS.DARK_MODE,
        enabled: true
    },
    {
        flag: FEATURE_FLAGS.ADVANCED_SEARCH,
        enabled: false
    },
    {
        flag: FEATURE_FLAGS.BULK_OPERATIONS,
        enabled: false
    },
    {
        flag: FEATURE_FLAGS.ANALYTICS_DASHBOARD,
        enabled: false
    },
    {
        flag: FEATURE_FLAGS.CUSTOM_BRANDING,
        enabled: true
    },
    {
        flag: FEATURE_FLAGS.API_ACCESS,
        enabled: false
    },
    {
        flag: FEATURE_FLAGS.SSO_LOGIN,
        enabled: false
    },
    {
        flag: FEATURE_FLAGS.AUDIT_LOGS,
        enabled: false
    }
];
/**
 * Resolves feature flags for a specific tenant
 */ export function resolveFeatureFlags(tenantId, tenantFeatures = [], configOverrides = []) {
    // Start with all flags disabled
    const result = Object.values(FEATURE_FLAGS).reduce((acc, flag)=>{
        acc[flag] = false;
        return acc;
    }, {});
    // Apply default configuration
    for (const config of defaultFeatureFlags){
        if (config.enabled) {
            var _config_blockedTenants;
            // Check tenant restrictions
            if ((_config_blockedTenants = config.blockedTenants) == null ? void 0 : _config_blockedTenants.includes(tenantId)) continue;
            if (config.allowedTenants && !config.allowedTenants.includes(tenantId)) continue;
            result[config.flag] = true;
        }
    }
    // Apply config overrides
    for (const config of configOverrides){
        var _config_blockedTenants1;
        if ((_config_blockedTenants1 = config.blockedTenants) == null ? void 0 : _config_blockedTenants1.includes(tenantId)) {
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
    for (const feature of tenantFeatures){
        result[feature] = true;
    }
    return result;
}
/**
 * Type-safe feature flag checker
 */ export function createFeatureFlagChecker(flags) {
    return function isFeatureEnabled(flag) {
        var _flags_flag;
        return (_flags_flag = flags[flag]) != null ? _flags_flag : false;
    };
}
/**
 * Checks if a feature is enabled
 */ export function isFeatureEnabled(flags, flag) {
    var _flags_flag;
    return (_flags_flag = flags[flag]) != null ? _flags_flag : false;
}

//# sourceMappingURL=feature-flags.js.map