import { format } from '../format'
import { DirectiveContext } from "../../types"
import { applyTransforms } from '../../apply-transforms'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { toMatchFile } from 'jest-file-snapshot'

expect.extend({ toMatchFile })

describe('format', () => {
    let dirCtx: DirectiveContext
    beforeAll(() => {
        dirCtx = { useParam: jest.fn, addMetadata: jest.fn, warn: jest.fn, error: jest.fn }
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
            img = sharp(join(__dirname, '../../__tests__/__assets__/pexels-allec-gomes-5195763.jpg'))
        })

        test('webp', async () => {
            //@ts-ignore
            const out = await applyTransforms([format({ format: 'webp' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('jpg', async () => {
            //@ts-ignore
            const out = await applyTransforms([format({ format: 'jpg' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('jpeg', async () => {
            //@ts-ignore
            const out = await applyTransforms([format({ format: 'jpeg' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('png', async () => {
            //@ts-ignore
            const out = await applyTransforms([format({ format: 'png' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('avif', async () => {
            //@ts-ignore
            const out = await applyTransforms([format({ format: 'avif' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('heif', async () => {
            //@ts-ignore
            const out = await applyTransforms([format({ format: 'heif' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('heic', async () => {
            //@ts-ignore
            const out = await applyTransforms([format({ format: 'heic' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('tiff', async () => {
            //@ts-ignore
            const out = await applyTransforms([format({ format: 'tiff' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('jpeg w/ quality', async () => {
            //@ts-ignore
            const out = await applyTransforms([format({ format: 'jpeg', quality: '10' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('png w/ quality', async () => {
            console.warn('png w/ quality doesnt seem to work');
            
            //@ts-ignore
            const out = await applyTransforms([format({ format: 'png', quality: '10' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('webp w/ quality', async () => {
            //@ts-ignore
            const out = await applyTransforms([format({ format: 'webp', quality: '10' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('tiff w/ quality', async () => {
            //@ts-ignore
            const out = await applyTransforms([format({ format: 'tiff', quality: '10' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('avif w/ quality', async () => {
            //@ts-ignore
            const out = await applyTransforms([format({ format: 'avif', quality: '10' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('heif w/ quality', async () => {
            //@ts-ignore
            const out = await applyTransforms([format({ format: 'heif', quality: '10' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('jpeg w/ progressive', async () => {
            //@ts-ignore
            const out = await applyTransforms([format({ format: 'jpeg', progressive: 'true' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('png w/ progressive', async () => {
            //@ts-ignore
            const out = await applyTransforms([format({ format: 'png', progressive: 'true' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })
    })
})