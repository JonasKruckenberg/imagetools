import { build } from 'vite'
import { imagetools } from '../index'
import { join } from 'path'
import { getSource, testEntry } from './util'
import { toMatchFile } from 'jest-file-snapshot'

expect.extend({ toMatchFile })
process.chdir(join(__dirname, 'fixtures'))

describe('vite-imagetools', () => {
    describe('options', () => {
        describe('include', () => {
            it('accepts a string', async () => {
                const p = build({
                    logLevel: 'warn',
                    build: { write: false },
                    plugins: [
                        testEntry(`
                            import Image from "./pexels-allec-gomes-5195763.jpg?w=300"
                            export default Image
                        `),
                        imagetools({
                            include: '**/*.jpg?*'
                        })
                    ]
                })

                expect(p).resolves.toBeDefined()
            })

            it('accepts a regex', () => {
                const p = build({
                    logLevel: 'warn',
                    build: { write: false },
                    plugins: [
                        testEntry(`
                            import Image from "./pexels-allec-gomes-5195763.jpg?w=300"
                            export default Image
                        `),
                        imagetools({
                            include: /\w+\.jpg/
                        })
                    ]
                })

                expect(p).resolves.toBeDefined()
            })

            it('accepts an array', () => {
                const p = build({
                    logLevel: 'warn',
                    build: { write: false },
                    plugins: [
                        testEntry(`
                            import Image from "./pexels-allec-gomes-5195763.jpg?w=300"
                            export default Image
                        `),
                        imagetools({
                            include: ['**/*.jpg?*', /\w+\.jpg/]
                        })
                    ]
                })

                expect(p).resolves.toBeDefined()
            })

            it('errors on invalid input', () => {
                const p = build({
                    logLevel: 'silent',
                    build: { write: false },
                    plugins: [
                        testEntry(`
                            import Image from "./pexels-allec-gomes-5195763.jpg?w=300"
                            export default Image
                        `),
                        imagetools({
                            //@ts-ignore
                            include: 100
                        })
                    ]
                })

                expect(p).rejects.toBeDefined()
            })

            it('does nothing non matching import', () => {
                const p = build({
                    logLevel: 'warn',
                    build: { write: false },
                    plugins: [
                        testEntry(`
                            import Image from "./pexels-allec-gomes-5195763.jpg?w=300"
                            export default Image
                        `),
                        imagetools({
                            include: ''
                        })
                    ]
                })

                expect(p).resolves.toBeDefined()
            })
        })

        describe('exclude', () => {
            it('accepts a string', async () => {
                const p = build({
                    logLevel: 'warn',
                    build: { write: false },
                    plugins: [
                        testEntry(`
                            import Image from "./pexels-allec-gomes-5195763.jpg?w=300"
                            export default Image
                        `),
                        imagetools({
                            exclude: '**/*.png'
                        })
                    ]
                })

                expect(p).resolves.toBeDefined()
            })

            it('accepts a regex', () => {
                const p = build({
                    logLevel: 'warn',
                    build: { write: false },
                    plugins: [
                        testEntry(`
                            import Image from "./pexels-allec-gomes-5195763.jpg?w=300"
                            export default Image
                        `),
                        imagetools({
                            exclude: /\w+\.png/
                        })
                    ]
                })

                expect(p).resolves.toBeDefined()
            })

            it('accepts an array', () => {
                const p = build({
                    logLevel: 'warn',
                    build: { write: false },
                    plugins: [
                        testEntry(`
                            import Image from "./pexels-allec-gomes-5195763.jpg?w=300"
                            export default Image
                        `),
                        imagetools({
                            exclude: ['**/*.png?*', /\w+\.png/]
                        })
                    ]
                })

                expect(p).resolves.toBeDefined()
            })

            it('errors on invalid input', () => {
                const p = build({
                    logLevel: 'silent',
                    build: { write: false },
                    plugins: [
                        testEntry(`
                            import Image from "./pexels-allec-gomes-5195763.jpg?w=300"
                            export default Image
                        `),
                        imagetools({
                            //@ts-ignore
                            exclude: 100
                        })
                    ]
                })

                expect(p).rejects.toBeDefined()
            })

            it('resolves normal on non matching input', () => {
                const p = build({
                    logLevel: 'warn',
                    build: { write: false },
                    plugins: [
                        testEntry(`
                            import Image from "./pexels-allec-gomes-5195763.jpg?w=300"
                            export default Image
                        `),
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
        const bundle = await build({
            logLevel: 'warn',
            build: { write: false },
            plugins: [
                testEntry(`
                    import Image from "./pexels-allec-gomes-5195763.jpg?w=300"
                    export default Image
                `),
                imagetools()
            ]
        })

        const { source } = await getSource(bundle)
        expect(source).toMatchFile()
    })

    test('absolute import', async () => {
        const imagePath = join(process.cwd(), 'pexels-allec-gomes-5195763.jpg')

        const bundle = await build({
            logLevel: 'warn',
            build: { write: false },
            plugins: [
                testEntry(`
                    import Image from "${imagePath}?w=300"
                    export default Image
                `),
                imagetools()
            ]
        })

        const { source } = await getSource(bundle)
        expect(source).toMatchFile()
    })

    test('non existent file', () => {
        // const p = rollup({
        //     plugins: [
        //         testEntry(`import Image from "./invalid.jpg?w=300"`),
        //         imagetools()
        //     ]
        // })

        // expect(p).rejects.toBeDefined()
    })

    test('no directives', () => {
        // const p = rollup({
        //     plugins: [
        //         testEntry(`import Image from "./pexels-allec-gomes-5195763.jpg"`),
        //         imagetools()
        //     ]
        // })

        // expect(p).rejects.toBeDefined()
    })
})