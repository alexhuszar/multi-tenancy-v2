export default {
  displayName: 'services/appwrite',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': [
      '@swc/jest',
      {
        swcrc: false,
        jsc: {
          target: 'es2022',
          parser: { syntax: 'typescript', tsx: false },
        },
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js'],
  coverageDirectory: '../../../coverage/libs/services/appwrite',
};
