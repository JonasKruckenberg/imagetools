import { normalize } from '../normalize'
import { join } from 'path'
import sharp from 'sharp'
import { DirectiveContext } from '../../types'
import { transformImage } from '../../util'
import { applyTransforms } from '../../util'
import { toMatchFile } from 'jest-file-snapshot'

expect.extend({ toMatchFile })

describe('normalize', () => {
    let dirCtx: DirectiveContext
    beforeEach(() => {
        dirCtx = { useParam: jest.fn, setMetadata: jest.fn }
    })

    it('returns a function when normalize is empty', () => {
        const res = normalize({ normalize: '' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    it('returns a function when normalize is true', () => {
        const res = normalize({ normalize: 'true' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    it('returns null when normalize is anything else', () => {
        const r1 = normalize({ normalize: 'null' }, dirCtx)

        expect(r1).toBeNull()

        const r2 = normalize({ normalize: 'anything else' }, dirCtx)

        expect(r2).toBeNull()
    })

    it('returns null if "normalize" is missing', () => {
        const res = normalize({}, dirCtx)
        expect(res).toBeNull()
    })

    it('marks "normalize" as used', () => {
        const usedParams = new Set()
        normalize({ normalize: '' }, { useParam: k => usedParams.add(k), setMetadata: jest.fn })

        expect(usedParams.has('normalize')).toBeTruthy()
    })

    it('adds "normalize" to the output metadata', () => {
        const metadata = new Map()
        normalize({ normalize: '' }, { useParam: jest.fn, setMetadata: (k, v) => metadata.set(k, v) })

        expect(metadata.has('normalize')).toBeTruthy()
        expect(metadata.get('normalize')).toEqual(true)
    })

    describe('transform', () => {
        it('normalizes the image', async () => {
            const img = sharp(join(__dirname, '/__assets__/pexels-allec-gomes-5195763.jpg'))

            //@ts-ignore
            const out = await transformImage(img, [normalize({ normalize: 'true' }, dirCtx)]).toBuffer()
            const out = await applyTransforms(img, [normalize({ normalize: 'true' }, dirCtx)]).toBuffer()

            expect(out).toMatchFile()
        })
    })
})