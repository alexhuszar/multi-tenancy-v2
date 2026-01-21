import type { Metadata } from 'next';
import { ThemeProvider } from '@multi-tenancy/design-system';
import { getTenantConfig, TenantRegistryEntry } from '@multi-tenancy/tenants';
import './global.css';

// In a real app, this would come from request headers/cookies/env
const TENANT_ID = process.env['TENANT_ID'] ?? 'dataroom';

function getRequiredTenantConfig(tenantId: string): TenantRegistryEntry {
  const config = getTenantConfig(tenantId);
  if (!config) {
    throw new Error(`Unknown tenant: ${tenantId}`);
  }
  return config;
}

const tenantConfig = getRequiredTenantConfig(TENANT_ID);

export const metadata: Metadata = {
  title: tenantConfig.getSettings().branding?.appName ?? 'DataRoom',
  description: 'DataRoom - The only storage solution you need.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider
          tenantConfig={tenantConfig.themeConfig}
          defaultMode="dark"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
