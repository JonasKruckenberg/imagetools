import { rollup } from 'rollup'
import { imagetools } from '../index'
import { join } from 'path'
import { testEntry, getSource } from './util'
import { toMatchImageSnapshot } from 'jest-image-snapshot'

expect.extend({ toMatchImageSnapshot })
process.chdir(join(__dirname, 'fixtures'))

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
            test('true removes private metadata', () => { })
            test('false leaves private metadata', () => { })
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

        const source = await getSource(bundle)        
        expect(source).toMatchImageSnapshot()
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

        const source = await getSource(bundle)
        expect(source).toMatchImageSnapshot()
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
})