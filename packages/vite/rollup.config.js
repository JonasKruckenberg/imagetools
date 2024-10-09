import typescript from '@rollup/plugin-typescript'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { builtinModules as builtins } from 'node:module'
import { fileURLToPath } from 'node:url'

const pkg = JSON.parse(await fs.readFile(path.join(fileURLToPath(import.meta.url), '..', 'package.json')))
const deps = Object.keys(pkg.dependencies || {})

export default {
  input: 'src/index.ts',
  external: [...builtins, ...deps],
  output: [
    {
      dir: './dist',
      entryFileNames: '[name].js',
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [typescript()]
}
