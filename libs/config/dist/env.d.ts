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
 * Creates environment configuration from process.env
 */
export declare function createEnvConfig(): EnvConfig;
/**
 * Validates environment configuration
 */
export declare function validateEnvConfig(config: EnvConfig): void;
//# sourceMappingURL=env.d.ts.map