import { Plugin } from "vite";
import { RollupOutput, OutputAsset } from 'rollup'
import pm from 'picomatch'

export function testEntry(source: string): Plugin {
    return {
        name: 'test-entry',
        enforce: 'pre',
        resolveId(source) {
            if (source === 'index.js') return 'index.js'
        },
        load(id) {
            if (id === 'index.js') return source
        }
    }
}

export function getFiles(bundle: RollupOutput | RollupOutput[], pattern: string) {
    const isMatch = pm(pattern)
    
    return (Array.isArray(bundle) ? bundle[0] : bundle).output
        .filter(entry => isMatch(entry.fileName))
}