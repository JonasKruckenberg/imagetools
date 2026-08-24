import { type InlineConfig, build, createLogger, createServer } from 'vite'
import { imagetools } from '../index'
import { join } from 'path'
import { getFiles, testEntry } from './util'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import { type OutputAsset, type OutputChunk, type RollupOutput } from 'rollup'
import { JSDOM } from 'jsdom'
import sharp from 'sharp'
import { afterEach, describe, test, expect, it, vi } from 'vitest'
import { createBasePath, writeFileAtomic, generateImageID, hash } from '../utils'
import { existsSync } from 'node:fs'
import { rm, utimes, readdir, copyFile, mkdir, readFile } from 'node:fs/promises'
import { createServer as createHttpServer } from 'node:http'
import { type AddressInfo } from 'node:net'

expect.extend({ toMatchImageSnapshot })

afterEach(() => {
  vi.restoreAllMocks()
})

describe('vite-imagetools', () => {
  describe('options', () => {
    describe('include', () => {
      it('accepts a string', async () => {
        const p = build({
          root: join(__dirname, '__fixtures__'),
          logLevel: 'warn',
          build: { write: false },
          plugins: [
            testEntry(`
                            import Image from "./pexels-allec-gomes-5195763.png?w=300"
                            export default Image
                        `),
            imagetools({
              include: '**/*.png?*'
            })
          ]
        })

        await expect(p).resolves.toBeDefined()
      })

      it('accepts a regex', async () => {
        const p = build({
          root: join(__dirname, '__fixtures__'),
          logLevel: 'warn',
          build: { write: false },
          plugins: [
            testEntry(`
                            import Image from "./pexels-allec-gomes-5195763.png?w=300"
                            export default Image
                        `),
            imagetools({
              include: /\w+\.png/
            })
          ]
        })

        await expect(p).resolves.toBeDefined()
      })

      it('accepts an array', async () => {
        const p = build({
          root: join(__dirname, '__fixtures__'),
          logLevel: 'warn',
          build: { write: false },
          plugins: [
            testEntry(`
                            import Image from "./pexels-allec-gomes-5195763.png?w=300"
                            export default Image
                        `),
            imagetools({
              include: ['**/*.png?*', /\w+\.png/]
            })
          ]
        })

        await expect(p).resolves.toBeDefined()
      })

      it('errors on invalid input', async () => {
        const p = build({
          root: join(__dirname, '__fixtures__'),
          logLevel: 'silent',
          build: { write: false },
          plugins: [
            testEntry(`
                            import Image from "./pexels-allec-gomes-5195763.png?w=300"
                            export default Image
                        `),
            imagetools({
              //@ts-expect-error invalid input
              include: 100
            })
          ]
        })

        await expect(p).rejects.toBeDefined()
      })

      it('does nothing non matching import', async () => {
        const p = build({
          root: join(__dirname, '__fixtures__'),
          logLevel: 'warn',
          build: { write: false },
          plugins: [
            testEntry(`
                            import Image from "./pexels-allec-gomes-5195763.png?w=300"
                            export default Image
                        `),
            imagetools({
              include: ''
            })
          ]
        })

        await expect(p).resolves.toBeDefined()
      })
    })

    describe('exclude', () => {
      it('accepts a string', async () => {
        const p = build({
          root: join(__dirname, '__fixtures__'),
          logLevel: 'warn',
          build: { write: false },
          plugins: [
            testEntry(`
                            import Image from "./pexels-allec-gomes-5195763.png?w=300"
                            export default Image
                        `),
            imagetools({
              exclude: '**/*.jpg'
            })
          ]
        })

        await expect(p).resolves.toBeDefined()
      })

      it('accepts a regex', async () => {
        const p = build({
          root: join(__dirname, '__fixtures__'),
          logLevel: 'warn',
          build: { write: false },
          plugins: [
            testEntry(`
                            import Image from "./pexels-allec-gomes-5195763.png?w=300"
                            export default Image
                        `),
            imagetools({
              exclude: /\w+\.jpg/
            })
          ]
        })

        await expect(p).resolves.toBeDefined()
      })

      it('accepts an array', async () => {
        const p = build({
          root: join(__dirname, '__fixtures__'),
          logLevel: 'warn',
          build: { write: false },
          plugins: [
            testEntry(`
                            import Image from "./pexels-allec-gomes-5195763.png?w=300"
                            export default Image
                        `),
            imagetools({
              exclude: ['**/*.jpg?*', /\w+\.jpg/]
            })
          ]
        })

        await expect(p).resolves.toBeDefined()
      })

      it('errors on invalid input', async () => {
        const p = build({
          root: join(__dirname, '__fixtures__'),
          logLevel: 'silent',
          build: { write: false },
          plugins: [
            testEntry(`
                            import Image from "./pexels-allec-gomes-5195763.png?w=300"
                            export default Image
                        `),
            imagetools({
              //@ts-expect-error invalid input
              exclude: 100
            })
          ]
        })

        await expect(p).rejects.toBeDefined()
      })

      it('resolves normal on non matching input', async () => {
        const p = build({
          root: join(__dirname, '__fixtures__'),
          logLevel: 'warn',
          build: { write: false },
          plugins: [
            testEntry(`
                            import Image from "./pexels-allec-gomes-5195763.png?w=300"
                            export default Image
                        `),
            imagetools({
              exclude: ''
            })
          ]
        })

        await expect(p).resolves.toBeDefined()
      })
    })

    describe('logging', () => {
      test('logs info messages to console', async () => {
        const logger = createLogger('info')
        const spy = vi.spyOn(logger, 'info')
        await build({
          root: join(__dirname, '__fixtures__'),
          logLevel: 'info',
          customLogger: logger,
          build: { write: false },
          plugins: [
            testEntry(`
                          import Image from "./with-metadata.png?warn"
                          window.__IMAGE__ = Image
                      `),
            imagetools({
              extendTransforms() {
                return [
                  (config, context) => {
                    context.logger.info('An info message')
                    return (_metadata, image) => image
                  }
                ]
              },
              cache: { enabled: false }
            })
          ]
        })

        expect(spy).toHaveBeenCalledWith('An info message')
      })
      test('logs warn messages through rollup', async () => {
        const logger = createLogger('info')
        const spy = vi.spyOn(logger, 'warn')
        await build({
          root: join(__dirname, '__fixtures__'),
          logLevel: 'warn',
          customLogger: logger,
          build: { write: false },
          plugins: [
            testEntry(`
                          import Image from "./with-metadata.png?warn"
                          window.__IMAGE__ = Image
                      `),
            imagetools({
              extendTransforms() {
                return [
                  (config, context) => {
                    context.logger.warn('A warning')
                    return (_metadata, image) => image
                  }
                ]
              },
              cache: { enabled: false }
            })
          ]
        })

        expect(spy.mock.lastCall?.[0]).toContain('A warning')
      })
      test('logs error messages through rollup', async () => {
        try {
          await build({
            root: join(__dirname, '__fixtures__'),
            logLevel: 'warn',
            build: { write: false },
            plugins: [
              testEntry(`
                            import Image from "./with-metadata.png?warn"
                            window.__IMAGE__ = Image
                        `),
              imagetools({
                extendTransforms() {
                  return [
                    (config, context) => {
                      context.logger.error('An error')
                      return (_metadata, image) => image
                    }
                  ]
                },
                cache: { enabled: false }
              })
            ]
          })
          fail()
        } catch (err: unknown) {
          const e = err as { message: string; errors: { plugin: string }[] }
          expect(e.errors[0].plugin).toEqual('imagetools')
          expect(e.message).toContain('An error')
        }
      })
    })

    describe('removeMetadata', () => {
      test('true removes private metadata', async () => {
        const bundle = (await build({
          root: join(__dirname, '__fixtures__'),
          logLevel: 'warn',
          build: { write: false },
          plugins: [
            testEntry(`
                            import Image from "./with-metadata.png?as=metadata"
                            window.__IMAGE__ = Image
                        `),
            imagetools({
              removeMetadata: true
            })
          ]
        })) as RollupOutput | RollupOutput[]

        const files = getFiles(bundle, '**.png') as OutputAsset[]

        const metadata = await sharp(files[0].source as Buffer).metadata()

        expect(metadata).not.toHaveProperty('xmp')
      })

      test('false leaves private metadata', async () => {
        const dir = './node_modules/.cache/imagetools_test_false_leaves_private_metadata'
        await rm(dir, { recursive: true, force: true })
        const bundle = (await build({
          root: join(__dirname, '__fixtures__'),
          logLevel: 'warn',
          build: { write: false },
          plugins: [
            testEntry(`
                            import Image from "./with-metadata.png?as=metadata"
                            window.__IMAGE__ = Image
                        `),
            imagetools({
              removeMetadata: false,
              cache: { dir }
            })
          ]
        })) as RollupOutput | RollupOutput[]

        const files = getFiles(bundle, '**.png') as OutputAsset[]

        const metadata = await sharp(files[0].source as Buffer).metadata()

        expect(metadata).toHaveProperty('xmp')
      })
    })

    describe('resolveConfigs', () => {
      test('can be used to generate multiple images (presets)', async () => {
        const bundle = (await build({
          root: join(__dirname, '__fixtures__'),
          logLevel: 'warn',
          build: { write: false },
          plugins: [
            testEntry(`
                            import Image from "./with-metadata.png?as=metadata"
                            window.__IMAGE__ = Image
                        `),
            imagetools({
              resolveConfigs() {
                return [{ w: '300' }, { w: '500' }]
              }
            })
          ]
        })) as RollupOutput | RollupOutput[]

        const files = getFiles(bundle, '**.png') as OutputAsset[]
        expect(files).toHaveLength(2)
      })
    })

    describe('defaultDirectives', () => {
      test('const', async () => {
        const bundle = (await build({
          root: join(__dirname, '__fixtures__'),
          logLevel: 'warn',
          build: { write: false },
          plugins: [
            testEntry(`
                            import Image from "./with-metadata.png"
                            window.__IMAGE__ = Image
                        `),
            imagetools({
              defaultDirectives: new URLSearchParams('w=300;500')
            })
          ]
        })) as RollupOutput | RollupOutput[]

        const files = getFiles(bundle, '**.png') as OutputAsset[]
        expect(files).toHaveLength(2)
      })

      test('function', async () => {
        const bundle = (await build({
          root: join(__dirname, '__fixtures__'),
          logLevel: 'warn',
          build: { write: false },
          plugins: [
            testEntry(`
                            import Image from "./with-metadata.png?mypreset"
                            window.__IMAGE__ = Image
                        `),
            imagetools({
              defaultDirectives: (id) => {
                if (id.searchParams.has('mypreset')) {
                  return new URLSearchParams('w=300;500')
                }
                return new URLSearchParams()
              }
            })
          ]
        })) as RollupOutput | RollupOutput[]

        const files = getFiles(bundle, '**.png') as OutputAsset[]
        expect(files).toHaveLength(2)
      })

      test('function with with metadata import', async () => {
        const bundle = (await build({
          root: join(__dirname, '__fixtures__'),
          logLevel: 'warn',
          build: { write: false },
          plugins: [
            testEntry(`
                import Image from "./with-metadata.png?mypreset"
                window.__IMAGE__ = Image
            `),
            imagetools({
              defaultDirectives: (id) => {
                if (id.searchParams.has('mypreset')) {
                  return new URLSearchParams('as=metadata')
                }
                return new URLSearchParams()
              }
            })
          ]
        })) as RollupOutput | RollupOutput[]

        const files = getFiles(bundle, '**.js') as OutputChunk[]
        const { window } = new JSDOM(``, { runScripts: 'outside-only' })
        window.eval(files[0].code)

        expect(window.__IMAGE__).toHaveProperty('width')
        expect(window.__IMAGE__).toHaveProperty('height')
        expect(window.__IMAGE__).toHaveProperty('format')
        expect(window.__IMAGE__).toHaveProperty('src')
        expect(window.__IMAGE__).toHaveProperty('space')
        expect(window.__IMAGE__).toHaveProperty('channels')
        expect(window.__IMAGE__).toHaveProperty('depth')
        expect(window.__IMAGE__).toHaveProperty('density')
        expect(window.__IMAGE__).toHaveProperty('isProgressive')
        expect(window.__IMAGE__).toHaveProperty('hasProfile')
        expect(window.__IMAGE__).toHaveProperty('hasAlpha')
        expect(window.__IMAGE__).not.toHaveProperty('config')
      })
    })

    describe('cache.retention', () => {
      test('is used to clear cache with retention of 86400', async () => {
        const dir = './node_modules/.cache/imagetools_test_cache_retention'
        await rm(dir, { recursive: true, force: true })
        const root = join(__dirname, '__fixtures__')
        const config: (width: number) => InlineConfig = (width) => ({
          root,
          logLevel: 'warn',
          build: { write: false },
          plugins: [
            testEntry(`
                            import Image from "./pexels-allec-gomes-5195763.png?w=${width}"
                            export default Image
                        `),
            imagetools({ cache: { dir, retention: 86400 } })
          ]
        })
        await build(config(300))
        const image_300 = (await readdir(dir))[0]
        expect(image_300).toBeTypeOf('string')

        await build(config(200))
        const image_200 = (await readdir(dir)).find((name) => name !== image_300)
        expect(image_200).toBeTypeOf('string')

        const date = new Date(Date.now() - 86400000)
        await utimes(`${dir}/${image_300}`, date, date)
        await utimes(`${dir}/${image_200}`, date, date)
        await build(config(200))
        expect(existsSync(`${dir}/${image_300}`)).toBe(false)
        expect(existsSync(`${dir}/${image_200}`)).toBe(true)
      })
    })

    describe('cache.dir', () => {
      const dir = './node_modules/.cache/imagetools_test_cache_dir'
      test('is used', async () => {
        await rm(dir, { recursive: true, force: true })
        const root = join(__dirname, '__fixtures__')
        await build({
          root,
          logLevel: 'warn',
          build: { write: false },
          plugins: [
            testEntry(`
                            import Image from "./pexels-allec-gomes-5195763.png?w=300"
                            export default Image
                        `),
            imagetools({ cache: { dir } })
          ]
        })

        const image = (await readdir(dir))[0]
        expect(image).toBeTypeOf('string')
      })

      test('is consistent', async () => {
        const dir = './node_modules/.cache/imagetools_test_cache_dir'
        await rm(dir, { recursive: true, force: true })
        const root = join(__dirname, '__fixtures__')
        await build({
          root,
          logLevel: 'warn',
          build: { write: false },
          plugins: [
            testEntry(`
                            import Image from "./pexels-allec-gomes-5195763.png?w=300"
                            export default Image
                        `),
            imagetools({ cache: { dir } })
          ]
        })

        const imageHash = hash([await readFile(join(__dirname, '__fixtures__', 'pexels-allec-gomes-5195763.png'))])
        expect(await readdir(dir)).toEqual([generateImageID({ w: '300' }, imageHash)])
      })
    })

    test('output format parameters do not create separate cache entries', async () => {
      const dir = './node_modules/.cache/imagetools_test_cache_output_format'
      await rm(dir, { recursive: true, force: true })

      const buildImport = async (directives: string) => {
        await build({
          root: join(__dirname, '__fixtures__'),
          logLevel: 'warn',
          build: { write: false },
          plugins: [
            testEntry(`
                import Image from "./pexels-allec-gomes-5195763.png?w=300&${directives}"
                export default Image
            `),
            imagetools({ cache: { dir } })
          ]
        })
      }

      const imageHash = hash([await readFile(join(__dirname, '__fixtures__', 'pexels-allec-gomes-5195763.png'))])
      const expectedId = generateImageID({ w: '300' }, imageHash)

      for (const directives of [
        'metadata=width',
        'metadata=width;height',
        'as=metadata',
        'as=url',
        'as=srcset',
        'as=picture'
      ]) {
        await buildImport(directives)
      }

      // the directives are the same, so every import shares one cache entry even
      // though their output format parameters differ
      expect(await readdir(dir)).toEqual([expectedId])

      // a change in an actual directive produces a separate entry
      await buildImport('w=200&metadata=width')
      expect(await readdir(dir)).toEqual([expectedId, generateImageID({ w: '200' }, imageHash)])
    })

    describe('cache.avifFormat', () => {
      test('is avif format', async () => {
        const dir = './node_modules/.cache/imagetools_test_cache_dir'
        await rm(dir, { recursive: true, force: true })
        await build({
          root: join(__dirname, '__fixtures__'),
          logLevel: 'warn',
          build: { write: false },
          plugins: [
            testEntry(`
                            import Image from "./pexels-allec-gomes-5195763.png?format=avif"
                            window.__IMAGE__ = Image
                        `),
            imagetools({ cache: { dir } })
          ]
        })

        const bundle = (await build({
          root: join(__dirname, '__fixtures__'),
          logLevel: 'warn',
          build: { write: false },
          plugins: [
            testEntry(`
                            import Image from "./pexels-allec-gomes-5195763.png?format=avif"
                            window.__IMAGE__ = Image
                        `),
            imagetools({ cache: { dir } })
          ]
        })) as RollupOutput | RollupOutput[]

        const files = getFiles(bundle, '**.avif') as OutputAsset[]

        expect(files).toHaveLength(1)
      })
    })

    describe('cache.jpgFormat', () => {
      test('keeps the jpg extension on cache hits', async () => {
        const dir = './node_modules/.cache/imagetools_test_cache_jpg_format'
        await rm(dir, { recursive: true, force: true })
        const buildOnce = async () =>
          (await build({
            root: join(__dirname, '__fixtures__'),
            logLevel: 'warn',
            build: { write: false },
            plugins: [
              testEntry(`
                            import Image from "./pexels-allec-gomes-5195763.png?format=jpg"
                            window.__IMAGE__ = Image
                        `),
              imagetools({ cache: { dir } })
            ]
          })) as RollupOutput | RollupOutput[]

        const coldFiles = getFiles(await buildOnce(), '**.jpg') as OutputAsset[]
        const warmFiles = getFiles(await buildOnce(), '**.jpg') as OutputAsset[]

        expect(coldFiles).toHaveLength(1)
        expect(warmFiles).toHaveLength(1)
        expect(warmFiles[0].fileName).toBe(coldFiles[0].fileName)
      })
    })
  })

  test('relative import', async () => {
    const bundle = (await build({
      root: join(__dirname, '__fixtures__'),
      logLevel: 'warn',
      build: { write: false },
      plugins: [
        testEntry(`
                    import Image from "./pexels-allec-gomes-5195763.png?w=300"
                    export default Image
                `),
        imagetools()
      ]
    })) as RollupOutput | RollupOutput[]

    const files = getFiles(bundle, '**.png') as OutputAsset[]
    expect(files[0].source).toMatchImageSnapshot()
  })

  test('absolute import', async () => {
    const imagePath = join(__dirname, '__fixtures__/pexels-allec-gomes-5195763.png')

    const bundle = (await build({
      root: join(__dirname, '__fixtures__'),
      logLevel: 'warn',
      build: { write: false },
      plugins: [
        testEntry(`
                    import Image from "${imagePath}?w=300"
                    export default Image
                `),
        imagetools()
      ]
    })) as RollupOutput | RollupOutput[]

    const files = getFiles(bundle, '**.png') as OutputAsset[]
    expect(files[0].source).toMatchImageSnapshot()
  })

  test('import with space in identifier', async () => {
    const bundle = (await build({
      root: join(__dirname, '__fixtures__'),
      logLevel: 'warn',
      build: { write: false },
      plugins: [
        testEntry(`
                    import Image from "./with space.png?w=300"
                    export default Image
                `),
        imagetools()
      ]
    })) as RollupOutput | RollupOutput[]

    const files = getFiles(bundle, '**.png') as OutputAsset[]
    expect(files[0].source).toMatchImageSnapshot()
  })

  test('inline import', async () => {
    const bundle = (await build({
      root: join(__dirname, '__fixtures__'),
      logLevel: 'warn',
      build: { write: false },
      plugins: [
        testEntry(`
            import Image from "./inline.png?inline"
            window.__IMAGE__ = Image
        `),
        imagetools()
      ]
    })) as RollupOutput | RollupOutput[]

    const files = getFiles(bundle, '**.js') as OutputChunk[]
    const { window } = new JSDOM(``, { runScripts: 'outside-only' })
    window.eval(files[0].code)

    const source = await readFile(join(__dirname, '__fixtures__', 'inline.png'))

    expect(window.__IMAGE__).toBe(`data:image/png;base64,${source.toString('base64')}`)
  })

  test('inline import with a transform', async () => {
    const bundle = (await build({
      root: join(__dirname, '__fixtures__'),
      logLevel: 'warn',
      build: { write: false },
      plugins: [
        testEntry(`
            import Image from "./inline.png?format=webp&inline"
            window.__IMAGE__ = Image
        `),
        imagetools()
      ]
    })) as RollupOutput | RollupOutput[]

    const files = getFiles(bundle, '**.js') as OutputChunk[]
    const { window } = new JSDOM(``, { runScripts: 'outside-only' })
    window.eval(files[0].code)

    expect(window.__IMAGE__).toMatch(/^data:image\/webp;base64,/)
  })

  test('import with space in identifier and cache', async () => {
    const dir = './node_modules/.cache/imagetools_test_import_with_space'
    await rm(dir, { recursive: true, force: true })
    const config: InlineConfig = {
      root: join(__dirname, '__fixtures__'),
      logLevel: 'warn',
      build: { write: false },
      plugins: [
        testEntry(`
                    import Image from "./with space.png?w=300"
                    export default Image
                `),
        imagetools({ cache: { dir } })
      ]
    }
    await build(config)
    const bundle = (await build(config)) as RollupOutput | RollupOutput[]
    const files = getFiles(bundle, '**.png') as OutputAsset[]
    expect(files[0].source).toMatchImageSnapshot()
  })

  // test for https://github.com/JonasKruckenberg/imagetools/issues/839
  test('import identical files with cache', async () => {
    const dir = './node_modules/.cache/imagetools_test_import_identical_files_with_cache'
    await rm(dir, { recursive: true, force: true })
    const fixturesRoot = join(__dirname, '__fixtures__')
    const numCopies = 200
    const copyFiles = async () => {
      for (let i = 0; i < numCopies; i++) {
        await copyFile(
          join(fixturesRoot, 'pexels-allec-gomes-5195763.png'),
          join(fixturesRoot, `pexels-allec-gomes-5195763-copy${i}.png`)
        )
      }
    }
    const deleteFileCopies = async () => {
      for (let i = 0; i < numCopies; i++) {
        await rm(join(fixturesRoot, `pexels-allec-gomes-5195763-copy${i}.png`), {
          force: true
        })
      }
    }
    try {
      await copyFiles()
      const config: InlineConfig = {
        root: fixturesRoot,
        logLevel: 'warn',
        build: { write: false, rollupOptions: { maxParallelFileOps: 100 } },
        plugins: [
          testEntry(`
                    const images = import.meta.glob(['./pexels-allec-gomes-5195763*.png'], {
                      eager: true,
                      import: "default",
                      query: { url: "" },
                    })
                    export default images
                `),
          imagetools({ cache: { dir } })
        ]
      }
      await expect(build(config)).resolves.toBeDefined()
    } finally {
      await deleteFileCopies()
    }
  })

  test('non existent file', async () => {
    const p = build({
      root: join(__dirname, '__fixtures__'),
      logLevel: 'warn',
      build: { write: false },
      plugins: [
        testEntry(`
                    import Image from "./invalid.png?w=300"
                    export default Image
                `),
        imagetools()
      ]
    })

    await expect(p).rejects.toBeDefined()
  })

  test('no directives', async () => {
    const p = build({
      root: join(__dirname, '__fixtures__'),
      logLevel: 'warn',
      build: { write: false },
      plugins: [
        testEntry(`
                import Image from "./pexels-allec-gomes-5195763.png"
                    export default Image
                `),
        imagetools()
      ]
    })

    await expect(p).resolves.toBeDefined()
  })

  describe('queries that ask nothing of imagetools', () => {
    const source = join(__dirname, '__fixtures__', 'pexels-allec-gomes-5195763.png')

    const buildImport = async (query: string, options?: Parameters<typeof imagetools>[0]) =>
      (await build({
        root: join(__dirname, '__fixtures__'),
        logLevel: 'warn',
        build: { write: false },
        plugins: [
          testEntry(`
                    import Image from "./pexels-allec-gomes-5195763.png${query}"
                    window.__IMAGE__ = Image
                `),
          imagetools(options)
        ]
      })) as RollupOutput | RollupOutput[]

    // hashed rather than compared byte by byte, so a failure does not diff two megabytes of pixels
    const emittedImage = (bundle: RollupOutput | RollupOutput[]) =>
      hash([(getFiles(bundle, '**.png')[0] as OutputAsset).source as Uint8Array])

    const sourceImage = async () => hash([await readFile(source)])

    it.each(['', '?url', '?url&no-inline', '?no-inline'])('emits the source image for "%s"', async (query) => {
      expect(emittedImage(await buildImport(query))).toBe(await sourceImage())
    })

    it('transforms when the query names a directive', async () => {
      expect(emittedImage(await buildImport('?w=300'))).not.toBe(await sourceImage())
    })

    it('transforms when the query selects an output format', async () => {
      expect(emittedImage(await buildImport('?as=url'))).not.toBe(await sourceImage())
    })

    it('transforms when the query names a directive of an extended transform', async () => {
      const bundle = await buildImport('?sepia', {
        extendTransforms: (builtins) => [
          ...builtins,
          ({ sepia }) => (sepia === undefined ? undefined : (_state, image) => image.tint('#704214'))
        ]
      })

      expect(emittedImage(bundle)).not.toBe(await sourceImage())
    })
  })

  test('metadata import', async () => {
    const bundle = (await build({
      root: join(__dirname, '__fixtures__'),
      logLevel: 'warn',
      build: { write: false },
      plugins: [
        testEntry(`
                    import Image from "./pexels-allec-gomes-5195763.png?as=metadata"
                    window.__IMAGE__ = Image
                `),
        imagetools()
      ]
    })) as RollupOutput | RollupOutput[]

    const files = getFiles(bundle, '**.js') as OutputChunk[]
    const { window } = new JSDOM(``, { runScripts: 'outside-only' })
    window.eval(files[0].code)

    expect(window.__IMAGE__).toHaveProperty('width')
    expect(window.__IMAGE__).toHaveProperty('height')
    expect(window.__IMAGE__).toHaveProperty('format')
    expect(window.__IMAGE__).toHaveProperty('src')
    expect(window.__IMAGE__).toHaveProperty('space')
    expect(window.__IMAGE__).toHaveProperty('channels')
    expect(window.__IMAGE__).toHaveProperty('depth')
    expect(window.__IMAGE__).toHaveProperty('density')
    expect(window.__IMAGE__).toHaveProperty('isProgressive')
    expect(window.__IMAGE__).toHaveProperty('hasProfile')
    expect(window.__IMAGE__).toHaveProperty('hasAlpha')
    expect(window.__IMAGE__).not.toHaveProperty('config')
  })

  test('metadata import does not include applied transform directives', async () => {
    const bundle = (await build({
      root: join(__dirname, '__fixtures__'),
      logLevel: 'warn',
      build: { write: false },
      plugins: [
        testEntry(`
                    import Image from "./pexels-allec-gomes-5195763.png?w=300&flip=true&format=webp&as=metadata"
                    window.__IMAGE__ = Image
                `),
        imagetools({ cache: { enabled: false } })
      ]
    })) as RollupOutput | RollupOutput[]

    const files = getFiles(bundle, '**.js') as OutputChunk[]
    const { window } = new JSDOM(``, { runScripts: 'outside-only' })
    window.eval(files[0].code)

    expect(window.__IMAGE__.width).toBe(300)
    expect(window.__IMAGE__.format).toBe('webp')
    expect(window.__IMAGE__).not.toHaveProperty('flip')
    expect(window.__IMAGE__).toHaveProperty('height')
  })

  test('metadata import omits transform directives on a cache hit', async () => {
    const dir = './node_modules/.cache/imagetools_test_metadata_cache_hit'
    await rm(dir, { recursive: true, force: true })

    const buildMetadata = async () => {
      const bundle = (await build({
        root: join(__dirname, '__fixtures__'),
        logLevel: 'warn',
        build: { write: false },
        plugins: [
          testEntry(`
                    import Image from "./pexels-allec-gomes-5195763.png?w=300&flip=true&format=webp&as=metadata"
                    window.__IMAGE__ = Image
                `),
          imagetools({ cache: { dir } })
        ]
      })) as RollupOutput | RollupOutput[]

      const files = getFiles(bundle, '**.js') as OutputChunk[]
      const { window } = new JSDOM(``, { runScripts: 'outside-only' })
      window.eval(files[0].code)
      return window.__IMAGE__
    }

    await buildMetadata() // cold: writes the cache entry
    const warm = await buildMetadata() // warm: served from the cache

    expect(warm.width).toBe(300)
    expect(warm.format).toBe('webp')
    expect(warm).not.toHaveProperty('flip')
  })

  test('metadata import is identical on a cache hit and a cache miss', async () => {
    const dir = './node_modules/.cache/imagetools_test_metadata_parity'
    await rm(dir, { recursive: true, force: true })

    const buildMetadata = async () => {
      const bundle = (await build({
        root: join(__dirname, '__fixtures__'),
        logLevel: 'warn',
        build: { write: false },
        plugins: [
          testEntry(`
                    import Image from "./pexels-allec-gomes-5195763.png?w=300&flip=true&format=webp&as=metadata"
                    window.__IMAGE__ = Image
                `),
          imagetools({ cache: { dir } })
        ]
      })) as RollupOutput | RollupOutput[]

      const files = getFiles(bundle, '**.js') as OutputChunk[]
      const { window } = new JSDOM(``, { runScripts: 'outside-only' })
      window.eval(files[0].code)
      return window.__IMAGE__
    }

    const cold = await buildMetadata() // cache miss
    const warm = await buildMetadata() // cache hit

    const { src: coldSrc, ...coldRest } = cold
    const { src: warmSrc, ...warmRest } = warm
    expect(coldSrc).toBe(warmSrc)
    expect(warmRest).toEqual(coldRest)
  })

  test('autoOrient is applied automatically', async () => {
    const bundle = (await build({
      root: join(__dirname, '__fixtures__'),
      logLevel: 'warn',
      build: { write: false },
      plugins: [
        testEntry(`
                    import Image from "./Landscape_5.jpg?as=metadata"
                    window.__IMAGE__ = Image
                `),
        imagetools()
      ]
    })) as RollupOutput | RollupOutput[]

    const files = getFiles(bundle, '**.js') as OutputChunk[]
    const { window } = new JSDOM(``, { runScripts: 'outside-only' })
    window.eval(files[0].code)

    expect(window.__IMAGE__.width).toBe(600)
    expect(window.__IMAGE__.height).toBe(450)
  })

  test('destructured metadata import', async () => {
    const bundle = (await build({
      root: join(__dirname, '__fixtures__'),
      logLevel: 'warn',
      build: { write: false },
      plugins: [
        testEntry(`
                    import { width, height, format } from "./pexels-allec-gomes-5195763.png?as=metadata"
                    window.__IMAGE__ = { width, height, format }
                `),
        imagetools()
      ]
    })) as RollupOutput | RollupOutput[]

    const files = getFiles(bundle, '**.js') as OutputChunk[]
    const { window } = new JSDOM(``, { runScripts: 'outside-only' })
    window.eval(files[0].code)

    expect(window.__IMAGE__).toHaveProperty('width')
    expect(window.__IMAGE__).toHaveProperty('height')
    expect(window.__IMAGE__).toHaveProperty('format')
  })

  test('metadata import with whitelist', async () => {
    const bundle = (await build({
      root: join(__dirname, '__fixtures__'),
      logLevel: 'warn',
      build: { write: false },
      plugins: [
        testEntry(`
                    import { width, format } from "./pexels-allec-gomes-5195763.png?as=metadata:width;format"
                    window.__IMAGE__ = { width, format }
                `),
        imagetools()
      ]
    })) as RollupOutput | RollupOutput[]

    const files = getFiles(bundle, '**.js') as OutputChunk[]
    const { window } = new JSDOM(``, { runScripts: 'outside-only' })
    window.eval(files[0].code)

    expect(window.__IMAGE__).toHaveProperty('width')
    expect(window.__IMAGE__).toHaveProperty('format')
    expect(window.__IMAGE__).not.toHaveProperty('height')
  })

  test('srcset', async () => {
    const bundle = (await build({
      root: join(__dirname, '__fixtures__'),
      logLevel: 'warn',
      build: { write: false },
      plugins: [
        testEntry(`
                        import Image from "./with-metadata.png?as=srcset"
                        window.__IMAGE__ = Image
                    `),
        imagetools()
      ]
    })) as RollupOutput | RollupOutput[]

    const files = getFiles(bundle, '**.js') as OutputChunk[]
    const { window } = new JSDOM(``, { runScripts: 'outside-only' })
    window.eval(files[0].code)

    expect(window.__IMAGE__).toBe('/assets/with-metadata-CMyRTzDt.png 600w')
  })

  // test for https://github.com/JonasKruckenberg/imagetools/issues/751
  test('basePixels produces consistent density descriptors on cache hits', async () => {
    const dir = './node_modules/.cache/imagetools_test_base_pixels_cache'
    await rm(dir, { recursive: true, force: true })
    const config: InlineConfig = {
      root: join(__dirname, '__fixtures__'),
      logLevel: 'warn',
      build: { write: false },
      plugins: [
        testEntry(`
                    import Image from "./with-metadata.png?w=300;600&basePixels=300&as=srcset"
                    window.__IMAGE__ = Image
                `),
        imagetools({ cache: { dir } })
      ]
    }
    const evalBuild = async () => {
      const bundle = (await build(config)) as RollupOutput | RollupOutput[]
      const files = getFiles(bundle, '**.js') as OutputChunk[]
      const { window } = new JSDOM(``, { runScripts: 'outside-only' })
      window.eval(files[0].code)
      return window.__IMAGE__ as string
    }

    const coldSrcset = await evalBuild()
    // the cache should now contain one file per generated config, so the second build reads from it
    expect(await readdir(dir)).toHaveLength(2)
    const warmSrcset = await evalBuild()

    expect(coldSrcset).toBe(warmSrcset)
    expect(coldSrcset).toMatch(/ 1x, .+ 2x$/)
    expect(coldSrcset).not.toMatch(/ \d+w/)
  })

  test('rotated images keep density descriptors consistent across cache hits', async () => {
    const dir = './node_modules/.cache/imagetools_test_base_pixels_rotate_cache'
    await rm(dir, { recursive: true, force: true })
    const config: InlineConfig = {
      root: join(__dirname, '__fixtures__'),
      logLevel: 'warn',
      build: { write: false },
      plugins: [
        testEntry(`
                    import Image from "./pexels-allec-gomes-5195763.png?rotate=90&basePixels=400&as=srcset"
                    window.__IMAGE__ = Image
                `),
        imagetools({ cache: { dir } })
      ]
    }
    const evalBuild = async () => {
      const bundle = (await build(config)) as RollupOutput | RollupOutput[]
      const files = getFiles(bundle, '**.js') as OutputChunk[]
      const { window } = new JSDOM(``, { runScripts: 'outside-only' })
      window.eval(files[0].code)
      return window.__IMAGE__ as string
    }

    const coldSrcset = await evalBuild()
    const warmSrcset = await evalBuild()

    // the source is 640x800, so `rotate=90` renders 800x640 without a resize; the cache-hit build
    // must not fall back to the stale pre-rotation width (640) when deriving the density descriptor
    expect(coldSrcset).toBe(warmSrcset)
    expect(coldSrcset).toMatch(/ 2x$/)
  })

  test('rotated images keep density descriptors correct without a cache', async () => {
    const config: InlineConfig = {
      root: join(__dirname, '__fixtures__'),
      logLevel: 'warn',
      build: { write: false },
      plugins: [
        testEntry(`
                    import Image from "./pexels-allec-gomes-5195763.png?rotate=90&basePixels=400&as=srcset"
                    window.__IMAGE__ = Image
                `),
        imagetools({ cache: { enabled: false } })
      ]
    }
    const bundle = (await build(config)) as RollupOutput | RollupOutput[]
    const files = getFiles(bundle, '**.js') as OutputChunk[]
    const { window } = new JSDOM(``, { runScripts: 'outside-only' })
    window.eval(files[0].code)

    // the source is 640x800, so `rotate=90` renders 800x640 without a resize; the density descriptor
    // must be derived from the rendered width (800) even though the transforms report 640
    expect(window.__IMAGE__ as string).toMatch(/ 2x$/)
  })

  test('async output format', async () => {
    const bundle = (await build({
      root: join(__dirname, '__fixtures__'),
      logLevel: 'warn',
      build: { write: false },
      plugins: [
        testEntry(`
          import Image from "./with-metadata.png?as=run"
          window.__IMAGE__ = Image
        `),
        imagetools({
          extendOutputFormats: (defaults) => ({
            ...defaults,
            run: () => () => new Promise((resolve) => setTimeout(() => resolve('success'), 500))
          })
        })
      ]
    })) as RollupOutput | RollupOutput[]

    const files = getFiles(bundle, '**.js') as OutputChunk[]
    const { window } = new JSDOM(``, { runScripts: 'outside-only' })
    window.eval(files[0].code)

    expect(window.__IMAGE__).toBe('success')
  })

  test('check "originalFilename" exported correctly', async () => {
    const bundle = (await build({
      root: join(__dirname, '__fixtures__'),
      logLevel: 'warn',
      build: { write: false },
      plugins: [
        testEntry(`
          import Image from "./with-metadata.png?as=srcset"
          window.__IMAGE__ = Image
        `),
        imagetools()
      ]
    })) as RollupOutput | RollupOutput[]

    const files = getFiles(bundle, '**.png') as OutputAsset[]
    const asset = files[0]

    expect(asset).toHaveProperty('fileName', 'assets/with-metadata-CMyRTzDt.png')
    expect(asset).toHaveProperty('names', ['with-metadata.png'])
    expect(asset).toHaveProperty('originalFileNames', ['with-metadata.png'])
  })

  test('dev server serves transformed images through the middleware', async () => {
    const vite = await createServer({
      root: join(__dirname, '__fixtures__'),
      logLevel: 'silent',
      server: { middlewareMode: true },
      plugins: [imagetools({ cache: { enabled: false } })]
    })
    const http = createHttpServer((req, res) => vite.middlewares(req, res))
    await new Promise<void>((resolve) => http.listen(0, resolve))
    const port = (http.address() as AddressInfo).port

    // Loading the image through the dev server populates the generated images map
    // and reports the dev server URL (basePath + id) on the metadata.
    const module = await vite.transformRequest('/pexels-allec-gomes-5195763.png?w=300&format=webp')
    const src = module?.code?.match(/\/@imagetools\/[a-f0-9]+/)?.[0]
    expect(src).toBeTruthy()

    const res = await fetch(`http://localhost:${port}${src}`)
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toBe('image/webp')
    expect((await res.arrayBuffer()).byteLength).toBeGreaterThan(0)

    const missing = await fetch(`http://localhost:${port}/@imagetools/does-not-exist`)
    expect(missing.status).toBe(404)

    await new Promise<void>((resolve) => http.close(resolve))
    await vite.close()
  })

  describe('utils', () => {
    test('createBasePath', () => {
      expect(createBasePath('')).toBe('/@imagetools/')
      expect(createBasePath('/')).toBe('/@imagetools/')
      expect(createBasePath('/base')).toBe('/base/@imagetools/')
      expect(createBasePath('/base/')).toBe('/base/@imagetools/')
      expect(createBasePath('http://localhost:9000/frontend')).toBe('http://localhost:9000/frontend/@imagetools/')
      expect(createBasePath('http://localhost:9000/frontend/')).toBe('http://localhost:9000/frontend/@imagetools/')
    })

    describe('writeFileAtomic', () => {
      const dir = './node_modules/.cache/imagetools_test_write_atomic'

      afterEach(async () => {
        await rm(dir, { recursive: true, force: true })
      })

      test('writes the full contents and leaves no temporary files behind', async () => {
        await mkdir(dir, { recursive: true })
        const target = `${dir}/entry`

        await writeFileAtomic(target, Buffer.from('complete'))

        expect(await readFile(target, 'utf8')).toBe('complete')
        expect(await readdir(dir)).toEqual(['entry'])
      })

      test('a concurrent reader never observes a partially written file', async () => {
        await mkdir(dir, { recursive: true })
        const target = `${dir}/entry`
        const oldContent = Buffer.alloc(4 * 1024 * 1024, 'a')
        const newContent = Buffer.alloc(4 * 1024 * 1024, 'b')
        await writeFileAtomic(target, oldContent)

        // read the target repeatedly while a rewrite is in flight. A plain
        // writeFile() truncates then fills, so readers catch short/mixed content —
        // exactly the state that later passes the cache's `size > 0` guard and
        // gets handed to sharp as a valid entry.
        const sizes = new Set<number>()
        let reading = true
        const reader = (async () => {
          while (reading) {
            try {
              sizes.add((await readFile(target)).length)
            } catch {
              sizes.add(-1) // target missing entirely
            }
          }
        })()

        await writeFileAtomic(target, newContent)
        reading = false
        await reader

        expect([...sizes]).toEqual([oldContent.length])
      })
    })
  })
})
