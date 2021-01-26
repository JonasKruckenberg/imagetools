import { createFilter, CreateFilter } from 'rollup-pluginutils'
import fs from 'fs/promises'
import sharp, {
  AvifOptions,
  format,
  JpegOptions,
  PngOptions,
  Sharp,
  TiffOptions,
  WebpOptions
} from 'sharp'
import path from 'path'
import { createHash } from 'crypto'
import MagicString from 'magic-string'

export interface Options {
  /**
   *
   */
  disable: boolean
  /**
   * Files to include in the processing
   * @default ["**\/*.png", "**\/*.jpg", "**\/*.jpeg", "**\/*.gif"]
   */
  include: Array<string | RegExp> | string | RegExp | null
  /**
   * Files to exclude
   * @default ""
   */
  exclude: Array<string | RegExp> | string | RegExp | null
  /**
   * A function that can transform the input image.
   * This can be used to implement custom actions such as resizing.
   * @argument sharp The Sharp instance that is used to transform the image
   * @argument format The target format the current instance will be transformed into
   */
  transform?: (sharp: Sharp, format: string) => Sharp | Promise<Sharp>

  /**
   * The Sharp jepg settings.
   * For further details and default value see: https://sharp.pixelplumbing.com/api-output#jpeg
   * Set to false to disable jpeg output
   */
  jpeg: JpegOptions | boolean
  /**
   * The Sharp png settings.
   * For further details and default value see: https://sharp.pixelplumbing.com/api-output#jpeg
   * Png enconding is disabled by default, set this to true or provide options to enable
   * @default false
   */
  png: PngOptions | boolean
  /**
   * The Sharp webp settings.
   * For further details and default value see: https://sharp.pixelplumbing.com/api-output#jpeg
   * Set to false to disable webp output
   */
  webp: WebpOptions | boolean
  /**
   * The Sharp avif settings.
   * For further details and default value see: https://sharp.pixelplumbing.com/api-output#jpeg
   * Set to false to disable avif output
   */
  avif: AvifOptions | boolean
  /**
   * The Sharp tiff settings.
   * For further details see: https://sharp.pixelplumbing.com/api-output#jpeg
   * Tiff enconding is disabled by default, set this to true or provide options to enable
   * @default false
   */
  tiff: TiffOptions | boolean
}

enum OutputFormats {
  jpeg,
  png,
  webp,
  avif,
  tiff
}
type OutputFormat = keyof typeof OutputFormats

const defaultOptions: Options = {
  disable: false,
  include: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif'],
  exclude: '',
  jpeg: {},
  png: false,
  webp: {},
  avif: {},
  tiff: false
}

export default function plugin(opts: Partial<Options> = {}) {
  const options = Object.assign({}, defaultOptions, opts)

  const filter = createFilter(options.include, options.exclude)

  const formats = Object.keys(options).filter(k => options[k] && k in OutputFormats)

  let globalConfig

  return {
    name: 'image-plugin',
    enforce: 'pre',

    configResolved(resolvedConfig) {
      globalConfig = resolvedConfig
    },

    async load(id: string) {
      if (!filter(id)) {
        return null
      } else {
        let paths: string[]

        if (globalConfig.command === 'serve') {
          paths = await transformDev(id, globalConfig)
        } else {
          paths = await transformBuild(id, globalConfig, this)
        }

        return `export default ${JSON.stringify(paths)}`
      }
    },

    renderChunk(code) {
      let match
      let s
      while ((match = assetUrlQuotedRE.exec(code))) {
        s = s || (s = new MagicString(code))
        const [full, fileHandle, postfix = ''] = match

        const outputFilepath = globalConfig.base + this.getFileName(fileHandle) + postfix
        s.overwrite(match.index, match.index + full.length, JSON.stringify(outputFilepath))
      }
      if (s) {
        return {
          code: s.toString(),
          map: globalConfig.build.sourcemap ? s.generateMap({ hires: true }) : null
        }
      } else {
        return null
      }
    }
  }

  async function transformDev(id: string, config: Record<string, any>) {
    const paths = await Promise.all(
      formats.map(async (format: OutputFormat) => {
        const cacheId = createHash('sha1').update(id).digest('hex').substr(0, 16)
        const cachePath = path.join(
          path.relative(process.cwd(), config.optimizeCacheDir),
          `${cacheId}.${format}`
        )

        if (!(await cached(cachePath))) {
          const buf = await transformFile(id, format, options)
          await fs.writeFile(cachePath, buf)
        }

        return '/' + cachePath
      })
    )

    // paths.push('/' + path.posix.relative(config.root, id))
    return paths.map(p => path.posix.join(config.base, p))
  }

  async function transformBuild(id: string, config: Record<string, any>, ctx: any) {
    return Promise.all(
      formats.map(async (format: OutputFormat) => {
        const cacheId = createHash('sha1').update(id).digest('hex').substr(0, 16)
        const cachePath = path.join(config.optimizeCacheDir, `${cacheId}.${format}`)

        let content: Uint8Array
        if (await cached(cachePath)) {
          content = await fs.readFile(cachePath)
        } else {
          content = await transformFile(id, format, options)
        }

        const file = cleanUrl(id)
        const { search, hash } = new URL(id)
        const postfix = (search || '') + (hash || '')

        const fileId = ctx.emitFile({
          name: `${path.basename(file, path.extname(file))}.${format}`,
          type: 'asset',
          source: content
        })

        return `__IMAGESET__${fileId}__${postfix ? `${postfix}__` : ``}`
      })
    )
  }
}

const assetUrlQuotedRE = /"__IMAGESET__([a-z\d]{8})__(?:([.^"]*?)__)?"/g

async function transformFile(id: string, target: OutputFormat, options) {
  return sharp(id)[target](options).toBuffer()
}

async function cached(path: string) {
  try {
    const stat = await fs.stat(path)
    return stat.isFile()
  } catch {
    return false
  }
}

const queryRE = /\?.*$/
const hashRE = /#.*$/

const cleanUrl = (url: string) => url.replace(hashRE, '').replace(queryRE, '')
