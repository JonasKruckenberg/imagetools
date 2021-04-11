const { pathsToModuleNameMapper } = require('ts-jest/utils')

const paths = {
  'imagetools-core': ['../core/src']
}

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  globals: {
    'ts-jest': {
      tsconfig: {
        paths
      },
    },
  },
  moduleNameMapper: pathsToModuleNameMapper(paths, { prefix: '<rootDir>/' }),
  collectCoverageFrom: [
    "src/**/*.ts",
    "!**/__tests__/**"
  ]
};