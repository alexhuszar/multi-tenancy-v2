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
  theme?: {
    primaryColor: string;
    logo?: string;
  };
  features?: string[];
}

export interface TenantCreateInput {
  name: string;
  slug: string;
  domain?: string;
}
