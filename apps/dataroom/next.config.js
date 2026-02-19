//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const path = require('path');

/** @type {import('@nx/next/plugins/with-nx').WithNxOptions & { experimental?: any }} */
const nextConfig = {
  // Use this to set Nx-specific options
  // See: https://nx.dev/recipes/next/next-config-setup
  nx: {},
  experimental: {
    turbopack: {
      // Resolve @multi-tenancy workspace packages directly from TypeScript source.
      // This avoids needing a built dist for the design-system during development.
      resolveAlias: {
        '@multi-tenancy/design-system/tokens': path.resolve(
          __dirname,
          '../../libs/ui/src/tokens/index.ts'
        ),
      },
    },
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
