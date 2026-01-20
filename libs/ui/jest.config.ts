export default {
  displayName: 'ui',
  preset: '../../jest.preset.js',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['../../jest.setup.ts'],
  transform: {
    '^.+\\.[tj]sx?$': [
      '@swc/jest',
      {
        swcrc: false,
        jsc: {
          target: 'es2022',
          parser: { syntax: 'typescript', tsx: true },
          transform: { react: { runtime: 'automatic' } },
        },
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/ui',
};
