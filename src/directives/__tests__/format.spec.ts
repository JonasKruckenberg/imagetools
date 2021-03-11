import { format, ImageFormat } from '../format'
import { DirectiveContext } from '../../types'
import { transformImage } from '../../util'
import { toMatchFile } from 'jest-file-snapshot'
import { join } from 'path'
import sharp from 'sharp'

expect.extend({ toMatchFile })

describe('format', () => {
    let dirCtx: DirectiveContext
    beforeEach(() => {
        dirCtx = { useParam: jest.fn, setMetadata: jest.fn }
    })

    it('marks "format" as used', () => {
        const usedParams = new Set()
        format({ format: 'webp' }, { useParam: k => usedParams.add(k), setMetadata: jest.fn })

        expect(usedParams.has('format')).toBeTruthy()
    })

    it('marks the shorthands as used', () => {
        const formats: ImageFormat[] = ['avif', 'jpg', 'jpeg', 'png', 'webp', 'tiff', 'heif', 'heic', 'gif']

        for (const f of formats) {
            const usedParams = new Set()
            format({ [f]: '' }, { useParam: k => usedParams.add(k), setMetadata: jest.fn })

            expect(usedParams.has(f)).toBeTruthy()
        }
    })

    it('add "format" to the output metadata', () => {
        const metadata = new Map()

        format({ format: 'avif' }, { useParam: jest.fn, setMetadata: (k, v) => metadata.set(k, v) })

        expect(metadata.has('format')).toBeTruthy()
        expect(metadata.get('format')).toEqual('avif')
    })

    it('returns null if the arg is not a valid format', () => {
        const res = format({ format: 'nothing' }, dirCtx)

        expect(res).toBeNull()
    })

    it('returns null if "format" is missing', () => {
        const res = format({}, dirCtx)
        expect(res).toBeNull()
    })

    describe('transform', () => {
        test('webp', async () => {
            const img = sharp(join(__dirname, '/__assets__/pexels-allec-gomes-5195763.jpg'))

            // @ts-ignore
            const out = await transformImage(img, [format({ format: 'webp' }, dirCtx)]).toBuffer()

            expect(out).toMatchFile()
        })

        test('jpg/jpeg', async () => {
            const img = sharp(join(__dirname, '/__assets__/pexels-allec-gomes-5195763.jpg'))

            // @ts-ignore
            const out1 = await transformImage(img, [format({ format: 'jpg' }, dirCtx)]).toBuffer()

            expect(out1).toMatchFile()

            // @ts-ignore
            const out2 = await transformImage(img, [format({ format: 'jpeg' }, dirCtx)]).toBuffer()

            expect(out1).toEqual(out2)
        })

        test('png', async () => {
            const img = sharp(join(__dirname, '/__assets__/pexels-allec-gomes-5195763.jpg'))

            // @ts-ignore
            const out = await transformImage(img, [format({ format: 'png' }, dirCtx)]).toBuffer()

            expect(out).toMatchFile()
        })

        test('avif', async () => {
            jest.setTimeout(200000)// such a high blur number takes longer than 5 sec
            const img = sharp(join(__dirname, '/__assets__/pexels-allec-gomes-5195763.jpg'))

            // @ts-ignore
            const out = await transformImage(img, [format({ format: 'avif' }, dirCtx)]).toBuffer()

            expect(out).toMatchFile()
        })

        test('heif', async () => {
            jest.setTimeout(200000)// such a high blur number takes longer than 5 sec
            const img = sharp(join(__dirname, '/__assets__/pexels-allec-gomes-5195763.jpg'))

            // @ts-ignore
            const out = await transformImage(img, [format({ format: 'heif' }, dirCtx)]).toBuffer()

            expect(out).toMatchFile()
        })

        test('heic', async () => {
            jest.setTimeout(200000)// such a high blur number takes longer than 5 sec
            const img = sharp(join(__dirname, '/__assets__/pexels-allec-gomes-5195763.jpg'))

            // @ts-ignore
            const out = await transformImage(img, [format({ format: 'heic' }, dirCtx)]).toBuffer()

            expect(out).toMatchFile()
        })

        test('tiff', async () => {
            jest.setTimeout(200000)// such a high blur number takes longer than 5 sec
            const img = sharp(join(__dirname, '/__assets__/pexels-allec-gomes-5195763.jpg'))

            // @ts-ignore
            const out = await transformImage(img, [format({ format: 'tiff' }, dirCtx)]).toBuffer()

            expect(out).toMatchFile()
        })
    })
})