import { Plugin, RollupBuild } from 'rollup'
import pm from 'picomatch'
import { basename } from 'path'

export function testEntry(source: string): Plugin {
  let id: string
  return {
    name: 'test-entry',
    resolveId(source) {
      if (basename(source) === 'index.js') {
        id = source
        return source
      }
    },
    load(_id) {
      if (_id === id) return source
    }
  }
}

export async function getFiles(bundle: RollupBuild, pattern: string) {
  const isMatch = pm(pattern)
  const { output } = await bundle.generate({ format: 'esm', dir: 'output' })

  return output.filter((entry) => isMatch(entry.fileName))
}
