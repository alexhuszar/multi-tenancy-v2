/**
 * Environment configuration with type safety
 */
export interface EnvConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  API_URL: string;
  APP_URL: string;
  DEFAULT_TENANT_ID: string;
  ENABLE_ANALYTICS: boolean;
}

/**
 * Gets environment variable with optional default
 */
function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key] ?? defaultValue;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

/**
 * Gets boolean environment variable
 */
function getBoolEnvVar(key: string, defaultValue: boolean): boolean {
  const value = process.env[key];
  if (value === undefined) return defaultValue;
  return value.toLowerCase() === 'true' || value === '1';
}

/**
 * Creates environment configuration from process.env
 */
export function createEnvConfig(): EnvConfig {
  return {
    NODE_ENV: (process.env['NODE_ENV'] ?? 'development') as EnvConfig['NODE_ENV'],
    API_URL: getEnvVar('API_URL', 'http://localhost:3001'),
    APP_URL: getEnvVar('APP_URL', 'http://localhost:3000'),
    DEFAULT_TENANT_ID: getEnvVar('DEFAULT_TENANT_ID', 'default'),
    ENABLE_ANALYTICS: getBoolEnvVar('ENABLE_ANALYTICS', false),
  };
}

/**
 * Validates environment configuration
 */
export function validateEnvConfig(config: EnvConfig): void {
  const validEnvs = ['development', 'production', 'test'];
  if (!validEnvs.includes(config.NODE_ENV)) {
    throw new Error(`Invalid NODE_ENV: ${config.NODE_ENV}`);
  }

  try {
    new URL(config.API_URL);
    new URL(config.APP_URL);
  } catch {
    throw new Error('Invalid URL in environment configuration');
  }
}
