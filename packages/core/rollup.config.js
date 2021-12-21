import typescript from '@rollup/plugin-typescript'
import pkg from './package.json'
import { builtinModules as builtins } from 'module'

const deps = Object.keys(pkg.dependencies || {})

export default {
  input: 'src/index.ts',
  external: [...builtins, ...deps],
  output: [
    {
      dir: './dist',
      entryFileNames: '[name].cjs',
      format: 'cjs',
      sourcemap: true
    },
    {
      dir: './dist',
      entryFileNames: '[name].mjs',
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [typescript()]
}
