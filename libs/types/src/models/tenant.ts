import { PartialDesignTokens, DeepPartial, SemanticTokens } from '../tokens';
import { FeatureFlag } from '../features';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  settings: TenantSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface TenantSettings {
  theme?: TenantThemeSettings;
  features?: FeatureFlag[];
  branding?: TenantBrandingSettings;
}

export interface TenantThemeSettings {
  tokenOverrides?: PartialDesignTokens;
  semanticOverrides?: DeepPartial<SemanticTokens>;
  defaultMode?: 'light' | 'dark' | 'system';
}

export interface TenantBrandingSettings {
  logo?: string;
  logoAlt?: string;
  favicon?: string;
  appName?: string;
}

export interface TenantCreateInput {
  name: string;
  slug: string;
  domain?: string;
}
