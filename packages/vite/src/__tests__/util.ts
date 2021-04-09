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

export async function getSource(bundle: RollupOutput | RollupOutput[]) {
    return (Array.isArray(bundle) ? bundle[0] : bundle).output
        .find((e): e is OutputAsset => e.type === 'asset' && Buffer.isBuffer(e.source))
}