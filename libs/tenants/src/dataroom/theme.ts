import type { TenantThemeConfig } from '@multi-tenancy/types';

export const dataroomThemeConfig: TenantThemeConfig = {
  tenantId: 'dataroom',
  tokenOverrides: {
    colors: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
        950: '#172554',
      },
    },
  },
  semanticOverrides: {
    interactive: {
      default: '#3b82f6',
      hover: '#2563eb',
      active: '#1d4ed8',
      disabled: '#d4d4d8',
    },
  },
};
