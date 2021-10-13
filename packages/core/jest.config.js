module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  collectCoverageFrom: ['src/**/*.ts', '!**/__tests__/**']
}
