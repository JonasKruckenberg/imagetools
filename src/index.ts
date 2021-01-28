import { createFilter, dataToEsm } from 'rollup-pluginutils'
import MagicString from 'magic-string'
import sharp from 'sharp'
import { Options, Target } from './types'
import { cleanUrl, assetUrlQuotedRE, transformId } from './util'
import cacache from 'cacache'
import path from 'path'
import { PluginContext } from 'rollup'

const defaultOptions: Options = {
  include: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp'],
  exclude: '',
  targets: [{ format: 'jpeg' }, { format: 'webp' }, { format: 'avif' }]
}

export default function imagesetPlugin(opts?: Options) {
  const pluginOptions = Object.assign({}, defaultOptions, opts)
  const filter = createFilter(pluginOptions.include, pluginOptions.exclude)

  let config: Record<string, any>

  return {
    name: 'imageset',
    enforce: 'pre',

    configResolved(resolvedConfig) {
      config = resolvedConfig
      pluginOptions.cachePath ??= path.join(config.optimizeCacheDir, 'imageset_cache')
    },

    async load(id: string) {
      if (!filter(id)) {
        return null
      } else {
        const paths = await Promise.all(
          pluginOptions.targets.map(target => {
            if (config.command === 'serve') {
              return transformDev(id, target)
            } else {
              return transformBuild(id, target, this)
            }
          })
        )

        const out = paths.reduce(
          (prev, { src, target }) => ({
            ...prev,
            [target.format]: src
          }),
          {}
        )

        return dataToEsm(out, { namedExports: false })
      }
    },

    renderChunk(code: string) {
      let match: RegExpExecArray
      let s: MagicString
      while ((match = assetUrlQuotedRE.exec(code))) {
        s = s || (s = new MagicString(code))
        const [full, fileHandle, postfix = ''] = match

        const outputFilepath = config.base + this.getFileName(fileHandle) + postfix
        s.overwrite(match.index, match.index + full.length, JSON.stringify(outputFilepath))
      }
      if (s) {
        return {
          code: s.toString(),
          map: config.build.sourcemap ? s.generateMap({ hires: true }) : null
        }
      } else {
        return null
      }
    }
  }

  async function transformDev(sourceId: string, target: Target) {
    const id = transformId(sourceId, target)
    const info = await cacache.get.info(pluginOptions.cachePath, id)

    if (info) {
      return { src: '/' + path.relative(config.root, info.path), target }
    } else {
      const content = await transformFile(sourceId, target)
      await cacache.put(pluginOptions.cachePath, id, content)
      const info = await cacache.get.info(pluginOptions.cachePath, id)

      return { src: '/' + path.relative(config.root, info.path), target }
    }
  }

  async function transformBuild(sourceId: string, target: Target, ctx: PluginContext) {
    const id = transformId(sourceId, target)
    const info = await cacache.get.info(pluginOptions.cachePath, id)

    let content: Uint8Array
    if (info) {
      const { data } = await cacache.get(pluginOptions.cachePath, id)
      content = data
    } else {
      content = await transformFile(sourceId, target)
      await cacache.put(pluginOptions.cachePath, id, content)
    }

    const file = cleanUrl(sourceId)
    const { search, hash } = new URL(sourceId)
    const postfix = (search || '') + (hash || '')

    const fileHandle = ctx.emitFile({
      name: `${path.basename(file, path.extname(file))}.${target.format}`,
      type: 'asset',
      source: content
    })

    return { src: `__IMAGESET__${fileHandle}__${postfix ? `${postfix}__` : ``}`, target }
  }

  async function transformFile(id: string, target: Target) {
    // load the file
    let img = sharp(id)
    // resize if necessary
    if (target.width || target.height) {
      img = img.resize(target)
    }
    // transform
    if (target.transform) {
      img = target.transform(img, target.format)
    }
    // transcode
    img = img[target.format](target)
    // return
    return img.toBuffer()
  }
}
