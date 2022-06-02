const { pathsToModuleNameMapper } = require('ts-jest')

const paths = {
  "imagetools-core": ["./packages/core/src"],
  "vite-imagetools": ["./packages/vite/src"],
  "rollup-plugin-imagetools": ["./packages/rollup/src"]
}

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  globals: {
    'ts-jest': {
      tsconfig: {
        paths
      }
    }
  },
  moduleNameMapper: pathsToModuleNameMapper(paths, { prefix: '<rootDir>/../../' }),
  collectCoverageFrom: ['src/**/*.ts', '!**/__tests__/**']
}
