import { Plugin } from 'vite'
import { RollupOutput } from 'rollup'
import pm from 'picomatch'
import { join, dirname } from 'path'

export function testEntry(source: string): Plugin {
  let id: string

  return {
    name: 'test-entry',
    enforce: 'pre',
    resolveId(source, importer) {
      if (source === 'index.js') {
        id = join(dirname(importer || ''), 'index.js')
        return id
      }
    },
    load(_id) {
      if (_id === id) return source
    }
  }
}

export function getFiles(bundle: RollupOutput | RollupOutput[], pattern: string) {
  const isMatch = pm(pattern)

  return (Array.isArray(bundle) ? bundle[0] : bundle).output.filter((entry) => isMatch(entry.fileName))
}
