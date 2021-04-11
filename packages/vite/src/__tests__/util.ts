import { Plugin } from "vite";
import { RollupOutput, OutputAsset } from 'rollup'

export function testEntry(source: string): Plugin {
    return {
        name: 'test-entry',
        enforce:'pre',
        resolveId(source) {
            if(source === 'index.js') return 'index.js'
        },
        load(id) {            
            if(id === 'index.js') return source
        }
    }
}

export function getSource(bundle: RollupOutput | RollupOutput[]): OutputAsset {
    const out = (Array.isArray(bundle) ? bundle[0] : bundle).output
        .find((e): e is OutputAsset => e.type === 'asset' && Buffer.isBuffer(e.source))
    if(!out) throw new Error('no source found')
    return out
}