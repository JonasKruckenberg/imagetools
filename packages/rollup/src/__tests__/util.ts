import { OutputAsset, Plugin, RollupBuild } from "rollup";
import pm from 'picomatch'

export function testEntry(value: string): Plugin {
    return {
        name: 'test-entry',
        options(options) {
            options.input = 'index.js'
            return options
        },
        resolveId(source) {
            if (source === 'index.js') return 'index.js'
            return null
        },
        load(id) {
            if (id === 'index.js') return value
            return null
        }
    }
}

export async function getFiles(bundle: RollupBuild, pattern: string) {
    const isMatch = pm(pattern)
    const { output } = await bundle.generate({ format: 'esm', dir: 'output' })

    return output.filter(entry => isMatch(entry.fileName))
}