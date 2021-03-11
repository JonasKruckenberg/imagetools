import { DirectiveContext } from '../../types'
import { flip } from '../flip'
import { join } from 'path'
import sharp from 'sharp'
import { transformImage } from '../../util'
import { toMatchFile } from 'jest-file-snapshot'

expect.extend({ toMatchFile })

describe('flip', () => {
    let dirCtx: DirectiveContext
    beforeEach(() => {
        dirCtx = { useParam: jest.fn, setMetadata: jest.fn }
    })

    it('returns a function when flip is empty', () => {
        const res = flip({ flip: '' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    it('returns a function when flip is true', () => {
        const res = flip({ flip: 'true' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    it('returns null when flip is anything else', () => {
        const r1 = flip({ flip: 'null' }, dirCtx)

        expect(r1).toBeNull()

        const r2 = flip({ flip: 'anything else' }, dirCtx)

        expect(r2).toBeNull()
    })

    it('returns null if "flip" is missing', () => {
        const res = flip({}, dirCtx)
        expect(res).toBeNull()
    })

    it('marks "flip" as used', () => {
        const usedParams = new Set()
        flip({ flip: '' }, { useParam: k => usedParams.add(k), setMetadata: jest.fn })

        expect(usedParams.has('flip')).toBeTruthy()
    })

    it('adds "flip" to the output metadata', () => {
        const metadata = new Map()
        flip({ flip: '' }, { useParam: jest.fn, setMetadata: (k, v) => metadata.set(k, v) })

        expect(metadata.has('flip')).toBeTruthy()
        expect(metadata.get('flip')).toEqual(true)
    })

    describe('transform', () => {
        it('flips the image', async () => {
            const img = sharp(join(__dirname, '/__assets__/pexels-allec-gomes-5195763.jpg'))

            // @ts-ignore
            const out = await transformImage(img, [flip({ flip: 'true' }, dirCtx)]).toBuffer()

            expect(out).toMatchFile()
        })
    })
})