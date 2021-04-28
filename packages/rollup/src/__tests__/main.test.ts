import { OutputAsset, OutputChunk, rollup } from 'rollup'
import { imagetools } from '../index'
import { join } from 'path'
import { testEntry, getFiles } from './util'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import { JSDOM } from 'jsdom'
import sharp from 'sharp'

expect.extend({ toMatchImageSnapshot })
process.chdir(join(__dirname, '__fixtures__'))

describe('rollup-plugin-imagetools', () => {
    describe('options', () => {
        describe('include', () => {
            it('accepts a string', async () => {
                const p = rollup({
                    plugins: [
                        testEntry(`import Image from "./pexels-allec-gomes-5195763.png?w=300"`),
                        imagetools({
                            include: '**/*.png?*'
                        })
                    ]
                })

                await expect(p).resolves.toBeDefined()
            })

            it('accepts a regex', async () => {
                const p = rollup({
                    plugins: [
                        testEntry(`import Image from "./pexels-allec-gomes-5195763.png?w=300"`),
                        imagetools({
                            include: /\w+\.png/
                        })
                    ]
                })

                await expect(p).resolves.toBeDefined()
            })

            it('accepts an array', async () => {
                const p = rollup({
                    plugins: [
                        testEntry(`import Image from "./pexels-allec-gomes-5195763.png?w=300"`),
                        imagetools({
                            include: ['**/*.png?*', /\w+\.png/]
                        })
                    ]
                })

                await expect(p).resolves.toBeDefined()
            })

            it('errors on invalid input', async () => {
                const p = rollup({
                    plugins: [
                        testEntry(`import Image from "./pexels-allec-gomes-5195763.png?w=300"`),
                        imagetools({
                            //@ts-ignore
                            include: 100
                        })
                    ]
                })

                await expect(p).rejects.toBeDefined()
            })

            it('rejects on non matching import', async () => {
                // because rollup cant resolve images by itself
                const p = rollup({
                    plugins: [
                        testEntry(`import Image from "./pexels-allec-gomes-5195763.png?w=300"`),
                        imagetools({
                            include: ''
                        })
                    ]
                })

                await expect(p).rejects.toBeDefined()
            })
        })

        describe('exclude', () => {
            it('accepts a string', async () => {
                const p = rollup({
                    plugins: [
                        testEntry(`import Image from "./pexels-allec-gomes-5195763.png?w=300"`),
                        imagetools({
                            exclude: '**/*.jpg'
                        })
                    ]
                })

                await expect(p).resolves.toBeDefined()
            })

            it('accepts a regex', async () => {
                const p = rollup({
                    plugins: [
                        testEntry(`import Image from "./pexels-allec-gomes-5195763.png?w=300"`),
                        imagetools({
                            exclude: /\w+\.jpg/
                        })
                    ]
                })

                await expect(p).resolves.toBeDefined()
            })

            it('accepts an array', async () => {
                const p = rollup({
                    plugins: [
                        testEntry(`import Image from "./pexels-allec-gomes-5195763.png?w=300"`),
                        imagetools({
                            exclude: ['**/*.jpg?*', /\w+\.jpg/]
                        })
                    ]
                })

                await expect(p).resolves.toBeDefined()
            })

            it('errors on invalid input', async () => {
                const p = rollup({
                    plugins: [
                        testEntry(`import Image from "./pexels-allec-gomes-5195763.png?w=300"`),
                        imagetools({
                            //@ts-ignore
                            exclude: 100
                        })
                    ]
                })

                await expect(p).rejects.toBeDefined()
            })

            it('resolves normal on non matching input', async () => {
                const p = rollup({
                    plugins: [
                        testEntry(`import Image from "./pexels-allec-gomes-5195763.png?w=300"`),
                        imagetools({
                            exclude: ''
                        })
                    ]
                })

                await expect(p).resolves.toBeDefined()
            })
        })

        describe('silent', () => {
            test('false by default', () => { })
            test('true disables all warnings', () => { })
            test('false enables warnings', () => { })
        })

        describe('removeMetadata', () => {
            test('true removes private metadata', async () => { 
                const bundle = await rollup({
                    plugins: [
                        testEntry(`
                            import Image from "./with-metadata.png?w=300"
                            export default Image
                        `),
                        imagetools({
                            removeMetadata: true
                        })
                    ]
                })
        
                const files = await getFiles(bundle, '**.png') as OutputAsset[]

                const metadata = await sharp(files[0].source as Buffer).metadata()
                
                expect(metadata).not.toHaveProperty('icc')
                expect(metadata).not.toHaveProperty('xmp')
            })

            test('false leaves private metadata', async () => { 
                const bundle = await rollup({
                    plugins: [
                        testEntry(`
                            import Image from "./with-metadata.png?w=300"
                            export default Image
                        `),
                        imagetools({
                            removeMetadata: false
                        })
                    ]
                })
        
                const files = await getFiles(bundle, '**.png') as OutputAsset[]

                const metadata = await sharp(files[0].source as Buffer).metadata()
                
                expect(metadata).toHaveProperty('icc')
                expect(metadata).toHaveProperty('xmp')
            })
        })

        describe('defaultDirectives', () => {
            test('object', async () => {
                const p = rollup({
                    plugins: [
                        testEntry(`
                            import Image from "./pexels-allec-gomes-5195763.png?w=300"
                            export default Image
                        `),
                        imagetools({
                            defaultDirectives: { foo:'bar' }
                        })
                    ]
                })

                await expect(p).resolves.toBeDefined()
            })

            test('function', async () => {
                const p = rollup({
                    plugins: [
                        testEntry(`
                            import Image from "./pexels-allec-gomes-5195763.png?w=300"
                            export default Image
                        `),
                        imagetools({
                            defaultDirectives: () => ({ foo:'bar' })
                        })
                    ]
                })

                await expect(p).resolves.toBeDefined()
            })
        })
    })

    test('relative path', async () => {
        const bundle = await rollup({
            plugins: [
                testEntry(`
                    import Image from "./pexels-allec-gomes-5195763.png?w=300"
                    export default Image
                `),
                imagetools()
            ]
        })

        const files = await getFiles(bundle, '**.png') as OutputAsset[]
        expect(files[0].source).toMatchImageSnapshot()
    })

    test('absolute path', async () => {
        const imagePath = join(process.cwd(), 'pexels-allec-gomes-5195763.png')

        const bundle = await rollup({
            plugins: [
                testEntry(`
                    import Image from "${imagePath}?w=300"
                    export default Image
                `),
                imagetools()
            ]
        })

        const files = await getFiles(bundle, '**.png') as OutputAsset[]
        expect(files[0].source).toMatchImageSnapshot()
    })

    test('non existent file', async () => {
        const p = rollup({
            plugins: [
                testEntry(`import Image from "./invalid.png?w=300"`),
                imagetools()
            ]
        })

        await expect(p).rejects.toBeDefined()
    })

    test('no directives', async () => {
        const p = rollup({
            plugins: [
                testEntry(`import Image from "./pexels-allec-gomes-5195763.png"`),
                imagetools()
            ]
        })

        await expect(p).rejects.toBeDefined()
    })

    test('metadata import', async () => {
        const bundle = await rollup({
            plugins: [
                testEntry(`
                    import Image from "./pexels-allec-gomes-5195763.png?metadata"
                    window.__IMAGE__ = Image
                `),
                imagetools()
            ]
        })

        const files = await getFiles(bundle, '**.js') as OutputChunk[]        
        const { window } = new JSDOM(``, { runScripts: "outside-only" });
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
        const bundle = await rollup({
            plugins: [
                testEntry(`
                    import { width, height, format } from "./pexels-allec-gomes-5195763.png?metadata"
                    window.__IMAGE__ = { width, height, format }
                `),
                imagetools()
            ]
        })

        const files = await getFiles(bundle, '**.js') as OutputChunk[]
        const { window } = new JSDOM(``, { runScripts: "outside-only" });
        window.eval(files[0].code)

        expect(window.__IMAGE__).toHaveProperty('width')
        expect(window.__IMAGE__).toHaveProperty('height')
        expect(window.__IMAGE__).toHaveProperty('format')
    })
})