/**
 * Environment configuration with type safety
 */ /**
 * Gets environment variable with optional default
 */ function getEnvVar(key, defaultValue) {
    var _process_env_key;
    const value = (_process_env_key = process.env[key]) != null ? _process_env_key : defaultValue;
    if (value === undefined) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
}
/**
 * Gets boolean environment variable
 */ function getBoolEnvVar(key, defaultValue) {
    const value = process.env[key];
    if (value === undefined) return defaultValue;
    return value.toLowerCase() === 'true' || value === '1';
}
/**
 * Creates environment configuration from process.env
 */ export function createEnvConfig() {
    var _process_env_NODE_ENV;
    return {
        NODE_ENV: (_process_env_NODE_ENV = process.env['NODE_ENV']) != null ? _process_env_NODE_ENV : 'development',
        API_URL: getEnvVar('API_URL', 'http://localhost:3001'),
        APP_URL: getEnvVar('APP_URL', 'http://localhost:3000'),
        DEFAULT_TENANT_ID: getEnvVar('DEFAULT_TENANT_ID', 'default'),
        ENABLE_ANALYTICS: getBoolEnvVar('ENABLE_ANALYTICS', false)
    };
}
/**
 * Validates environment configuration
 */ export function validateEnvConfig(config) {
    const validEnvs = [
        'development',
        'production',
        'test'
    ];
    if (!validEnvs.includes(config.NODE_ENV)) {
        throw new Error(`Invalid NODE_ENV: ${config.NODE_ENV}`);
    }
    try {
        new URL(config.API_URL);
        new URL(config.APP_URL);
    } catch (e) {
        throw new Error('Invalid URL in environment configuration');
    }
}

//# sourceMappingURL=env.js.map