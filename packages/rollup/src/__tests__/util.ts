import { OutputAsset, Plugin, RollupBuild } from "rollup";

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

export async function getSource(bundle: RollupBuild) {
    const { output } = await bundle.generate({ format: 'esm', dir: 'output' })

    const files = output.filter((e): e is OutputAsset => e.type === 'asset')

    return files[0].source
}