import 'reflect-metadata';

export default {
  bail: true,
  clearMocks: true,
  coverageProvider: 'v8',
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest.config.ts'],
  testMatch: ['**/*.spec.ts'],
};