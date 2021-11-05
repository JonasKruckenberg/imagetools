import { build } from 'vite'
import { imagetools } from '../index'
import { join } from 'path'
import { getFiles, testEntry } from './util'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import { OutputAsset, OutputChunk, RollupOutput } from 'rollup'
import { JSDOM } from 'jsdom'
import sharp from 'sharp'

expect.extend({ toMatchImageSnapshot })
process.chdir(join(__dirname, '__fixtures__'))

describe('vite-imagetools', () => {
  describe('options', () => {
    describe('include', () => {
      it('accepts a string', async () => {
        const p = build({
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

    describe('silent', () => {
      test('false by default', () => {
      })
      test('true disables all warnings', () => {
      })
      test('false enables warnings', () => {
      })
    })

    describe('removeMetadata', () => {
      test('true removes private metadata', async () => {
        const bundle = (await build({
          logLevel: 'warn',
          build: { write: false },
          plugins: [
            testEntry(`
                            import Image from "./with-metadata.png?metadata"
                            window.__IMAGE__ = Image
                        `),
            imagetools({
              removeMetadata: true
            })
          ]
        })) as RollupOutput | RollupOutput[]

        const files = getFiles(bundle, '**.png') as OutputAsset[]

        const metadata = await sharp(files[0].source as Buffer).metadata()

        expect(metadata).not.toHaveProperty('icc')
        expect(metadata).not.toHaveProperty('xmp')
      })

      test('false leaves private metadata', async () => {
        const bundle = (await build({
          logLevel: 'warn',
          build: { write: false },
          plugins: [
            testEntry(`
                            import Image from "./with-metadata.png?metadata"
                            window.__IMAGE__ = Image
                        `),
            imagetools({
              removeMetadata: false
            })
          ]
        })) as RollupOutput | RollupOutput[]

        const files = getFiles(bundle, '**.png') as OutputAsset[]

        const metadata = await sharp(files[0].source as Buffer).metadata()

        expect(metadata).toHaveProperty('icc')
        expect(metadata).toHaveProperty('xmp')
      })
    })

    describe('resolveConfigs', () => {
      test('can be used to generate multiple images (presets)', async () => {
        const bundle = (await build({
          logLevel: 'warn',
          build: { write: false },
          plugins: [
            testEntry(`
                            import Image from "./with-metadata.png?metadata"
                            window.__IMAGE__ = Image
                        `),
            imagetools({
              resolveConfigs() {
                return [
                  { width: '300' },
                  { width: '500' }
                ]
              }
            })
          ]
        })) as RollupOutput | RollupOutput[]

        const files = getFiles(bundle, '**.png') as OutputAsset[]
        expect(files).toHaveLength(2)
      })
    })
  })

  test('relative import', async () => {
    const bundle = (await build({
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
    const imagePath = join(process.cwd(), 'pexels-allec-gomes-5195763.png')

    const bundle = (await build({
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

  test('non existent file', async () => {
    const p = build({
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
      logLevel: 'warn',
      build: { write: false },
      plugins: [
        testEntry(`
                    import Image from "./pexels-allec-gomes-5195763.png?metadata"
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
      logLevel: 'warn',
      build: { write: false },
      plugins: [
        testEntry(`
                    import { width, height, format } from "./pexels-allec-gomes-5195763.png?metadata"
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
      logLevel: 'warn',
      build: { write: false },
      plugins: [
        testEntry(`
                    import { width, format } from "./pexels-allec-gomes-5195763.png?metadata=width;format"
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
})
