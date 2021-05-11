import { format } from '../format'
import { TransformFactoryContext } from "../../types"
import { applyTransforms } from '../../index'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { toMatchFile } from 'jest-file-snapshot'
import { toMatchImageSnapshot } from 'jest-image-snapshot'

expect.extend({ toMatchFile, toMatchImageSnapshot })

describe('format', () => {
    let dirCtx: TransformFactoryContext
    beforeAll(() => {
        dirCtx = { useParam: jest.fn, warn: jest.fn }
    })

    test('keyword "format"', () => {
        const res = format({ format: 'avif' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    test('missing', () => {
        const res = format({}, dirCtx)

        expect(res).toBeUndefined()
    })

    describe('shorthands', () => {
        test('invalid', () => {
            const formats = ['avif', 'jpg', 'jpeg', 'png', 'heif', 'heic', 'webp', 'tiff']

            for (const f of formats) {
                const res = format({ [f]: 'invalid' }, dirCtx)

                expect(res).toBeUndefined()
            }
        })

        test('valid', () => {
            const formats = ['avif', 'jpg', 'jpeg', 'png', 'heif', 'heic', 'webp', 'tiff']

            for (const f of formats) {
                const res = format({ [f]: '' }, dirCtx)

                expect(res).toBeInstanceOf(Function)
            }
        })
    })


    describe('arguments', () => {
        test('inavlid', () => {
            //@ts-expect-error
            const res = format({ format: 'invalid' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('empty', () => {
            //@ts-expect-error
            const res = format({ format: '' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('valid', () => {
            const formats = ['avif', 'jpg', 'jpeg', 'png', 'heif', 'heic', 'webp', 'tiff']

            for (const f of formats) {
                //@ts-ignore
                const res = format({ format: f }, dirCtx)

                expect(res).toBeInstanceOf(Function)
            }
        })
    })

    describe('transform', () => {
        let img: Sharp
        beforeEach(() => {
            img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
        })

        test('webp', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([format({ format: 'webp' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchFile()
        })

        test('jpg', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([format({ format: 'jpg' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchFile()
        })

        test('jpeg', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([format({ format: 'jpeg' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchFile()
        })

        test('png', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([format({ format: 'png' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchImageSnapshot()
        })

        test('avif', async () => {
            jest.setTimeout(10000)
            //@ts-ignore
            const { image, metadata } = await applyTransforms([format({ format: 'avif' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchFile()
        })

        test('heif', async () => {
            jest.setTimeout(10000)
            //@ts-ignore
            const { image, metadata } = await applyTransforms([format({ format: 'heif' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchFile()
        })

        test('heic', async () => {
            jest.setTimeout(10000)
            //@ts-ignore
            const { image, metadata } = await applyTransforms([format({ format: 'heic' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchFile()
        })

        test('tiff', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([format({ format: 'tiff' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchFile()
        })

        test('jpeg w/ quality', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([format({ format: 'jpeg', quality: '10' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchFile()
        })

        test('png w/ quality', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([format({ format: 'png', quality: '10' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchImageSnapshot()
        })

        test('webp w/ quality', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([format({ format: 'webp', quality: '10' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchFile()
        })

        test('tiff w/ quality', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([format({ format: 'tiff', quality: '10' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchFile()
        })

        test('avif w/ quality', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([format({ format: 'avif', quality: '10' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchFile()
        })

        test('heif w/ quality', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([format({ format: 'heif', quality: '10' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchFile()
        })

        test('jpeg w/ progressive', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([format({ format: 'jpeg', progressive: 'true' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchFile()
        })

        test('png w/ progressive', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([format({ format: 'png', progressive: 'true' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchImageSnapshot()
        })
    })
})