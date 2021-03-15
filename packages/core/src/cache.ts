import { mkdir, readFile, writeFile, stat, unlink } from 'fs/promises'
import { join, extname } from 'path'

export async function has(cachePath: string, key: string): Promise<boolean> {
    try {
        const file = await stat(join(cachePath, key))
        return file.isFile()
    } catch {
        return false
    }
}

export async function get(cachePath: string, key: string): Promise<{ data: Uint8Array, metadata: Record<string, any> }> {
    const [data, metadata] = await Promise.all([
        readFile(join(cachePath, key)),
        has(cachePath, key + '.json').then(has => has ? info(cachePath, key) : {})
    ])

    return { data, metadata }
}

export async function info(cachePath: string, key: string): Promise<Record<string, any>> {
    const rawMeta = await readFile(join(cachePath, key + '.json'), 'utf-8')
    return JSON.parse(rawMeta)
}

export async function put(cachePath: string, key: string, data: Uint8Array, metadata?: Record<string, any>): Promise<void> {
    await mkdir(cachePath, { recursive: true })

    await Promise.all([
        writeFile(join(cachePath, key), data),
        metadata ? writeFile(join(cachePath, key + '.json'), JSON.stringify(metadata)) : undefined
    ])
}

export async function remove(cachePath: string, key: string): Promise<void> {
    await Promise.all([
        unlink(join(cachePath, key)),
        has(cachePath, key + '.json').then(has => has ? unlink(join(cachePath, key + '.json')) : undefined)
    ])
}

export function generateKey(url: URL, config: Record<string, any>) {
    const name = Buffer.from(JSON.stringify(config)).toString('base64')
    const ext = config.format ? `.${config.format}` : extname(url.pathname)

    return name + ext
}