import { InlineConfig, build, createLogger } from 'vite'
import { imagetools } from '../index'
import { join } from 'path'
import { getFiles, testEntry } from './util'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import { OutputAsset, OutputChunk, RollupOutput } from 'rollup'
import { JSDOM } from 'jsdom'
import sharp from 'sharp'
import { afterEach, describe, test, expect, it, vi } from 'vitest'
import { createBasePath } from '../utils'
import { existsSync } from 'node:fs'
import { rm, utimes, readdir } from 'node:fs/promises'

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
                    return (image) => image
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
                    return (image) => image
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
                      return (image) => image
                    }
                  ]
                },
                cache: { enabled: false }
              })
            ]
          })
          fail()
        } catch (err: unknown) {
          const e = err as { plugin: string; message: string }
          expect(e.plugin).toEqual('imagetools')
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
        const image = (await readdir(dir))[0]

        expect(image).toBe('325b80fade286c672ea884b87e65f7a3278a9f8a')
      })
    })

    describe('cache.avifFormat', () => {
      test('is avif format', async () => {
        const dir = './node_modules/.cache/imagetools_test_cache_dir'
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

    expect(window.__IMAGE__).toBe(
      'data:image/png;base64,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'
    )
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

    expect(window.__IMAGE__).toBe('/assets/with-metadata-D_H5Cxui.png 600w')
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

  describe('utils', () => {
    test('createBasePath', () => {
      expect(createBasePath('')).toBe('/@imagetools/')
      expect(createBasePath('/')).toBe('/@imagetools/')
      expect(createBasePath('/base')).toBe('/base/@imagetools/')
      expect(createBasePath('/base/')).toBe('/base/@imagetools/')
      expect(createBasePath('http://localhost:9000/frontend')).toBe('http://localhost:9000/frontend/@imagetools/')
      expect(createBasePath('http://localhost:9000/frontend/')).toBe('http://localhost:9000/frontend/@imagetools/')
    })
  })
})
