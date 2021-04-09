import { rollup } from 'rollup'
import { imagetools } from '../index'
import { join } from 'path'
import { testEntry, getSource } from './util'
import { toMatchFile } from 'jest-file-snapshot'

expect.extend({ toMatchFile })
process.chdir(join(__dirname, 'fixtures'))

describe('rollup-plugin-imagetools', () => {
    describe('options', () => {
        describe('include', () => {
            it('accepts a string', async () => {
                const p = rollup({
                    plugins: [
                        testEntry(`import Image from "./pexels-allec-gomes-5195763.jpg?w=300"`),
                        imagetools({
                            include: '**/*.jpg?*'
                        })
                    ]
                })

                expect(p).resolves.toBeDefined()
            })

            it('accepts a regex', () => {
                const p = rollup({
                    plugins: [
                        testEntry(`import Image from "./pexels-allec-gomes-5195763.jpg?w=300"`),
                        imagetools({
                            include: /\w+\.jpg/
                        })
                    ]
                })

                expect(p).resolves.toBeDefined()
            })

            it('accepts an array', () => {
                const p = rollup({
                    plugins: [
                        testEntry(`import Image from "./pexels-allec-gomes-5195763.jpg?w=300"`),
                        imagetools({
                            include: ['**/*.jpg?*', /\w+\.jpg/]
                        })
                    ]
                })

                expect(p).resolves.toBeDefined()
            })

            it('errors on invalid input', () => {
                const p = rollup({
                    plugins: [
                        testEntry(`import Image from "./pexels-allec-gomes-5195763.jpg?w=300"`),
                        imagetools({
                            //@ts-ignore
                            include: 100
                        })
                    ]
                })

                expect(p).rejects.toBeDefined()
            })

            it('rejects on non matching import', async () => {
                // because rollup cant resolve images by itself
                const p = rollup({
                    plugins: [
                        testEntry(`import Image from "./pexels-allec-gomes-5195763.jpg?w=300"`),
                        imagetools({
                            include: ''
                        })
                    ]
                })

                expect(p).rejects.toBeDefined()
            })
        })

        describe('exclude', () => {
            it('accepts a string', async () => {
                const p = rollup({
                    plugins: [
                        testEntry(`import Image from "./pexels-allec-gomes-5195763.jpg?w=300"`),
                        imagetools({
                            exclude: '**/*.png'
                        })
                    ]
                })

                expect(p).resolves.toBeDefined()
            })

            it('accepts a regex', () => {
                const p = rollup({
                    plugins: [
                        testEntry(`import Image from "./pexels-allec-gomes-5195763.jpg?w=300"`),
                        imagetools({
                            exclude: /\w+\.png/
                        })
                    ]
                })

                expect(p).resolves.toBeDefined()
            })

            it('accepts an array', () => {
                const p = rollup({
                    plugins: [
                        testEntry(`import Image from "./pexels-allec-gomes-5195763.jpg?w=300"`),
                        imagetools({
                            exclude: ['**/*.png?*', /\w+\.png/]
                        })
                    ]
                })

                expect(p).resolves.toBeDefined()
            })

            it('errors on invalid input', () => {
                const p = rollup({
                    plugins: [
                        testEntry(`import Image from "./pexels-allec-gomes-5195763.jpg?w=300"`),
                        imagetools({
                            //@ts-ignore
                            exclude: 100
                        })
                    ]
                })

                expect(p).rejects.toBeDefined()
            })

            it('resolves normal on non matching input', () => {
                const p = rollup({
                    plugins: [
                        testEntry(`import Image from "./pexels-allec-gomes-5195763.jpg?w=300"`),
                        imagetools({
                            exclude: ''
                        })
                    ]
                })

                expect(p).resolves.toBeDefined()
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

    test('relative import', async () => {
        const bundle = await rollup({
            plugins: [
                testEntry(`
                    import Image from "./pexels-allec-gomes-5195763.jpg?w=300"
                    export default Image
                `),
                imagetools()
            ]
        })

        const source = await getSource(bundle)
        expect(source).toMatchFile()
    })
    test('absolute import', async () => {
        const imagePath = join(process.cwd(), 'pexels-allec-gomes-5195763.jpg')

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
        expect(source).toMatchFile()
    })

    test('non existent file', () => {
        const p = rollup({
            plugins: [
                testEntry(`import Image from "./invalid.jpg?w=300"`),
                imagetools()
            ]
        })

        expect(p).rejects.toBeDefined()
    })

    test('no directives', () => {
        const p = rollup({
            plugins: [
                testEntry(`import Image from "./pexels-allec-gomes-5195763.jpg"`),
                imagetools()
            ]
        })

        expect(p).rejects.toBeDefined()
    })
})