import { join } from 'path'
import sharp from 'sharp'
import { DirectiveContext } from '../../types'
import { flop } from '../flop'
import { applyTransforms } from '../../util'
import { toMatchFile } from 'jest-file-snapshot'

expect.extend({ toMatchFile })

describe('flop', () => {
    let dirCtx: DirectiveContext
    beforeEach(() => {
        dirCtx = { useParam: jest.fn, setMetadata: jest.fn }
    })

    it('returns a function when flop is empty', () => {
        const res = flop({ flop: '' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    it('returns a function when flop is true', () => {
        const res = flop({ flop: 'true' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    it('returns a function when flop is anything else', () => {
        const r1 = flop({ flop: 'null' }, dirCtx)

        expect(r1).toBeNull()

        const r2 = flop({ flop: 'anything else' }, dirCtx)

        expect(r2).toBeNull()
    })
    it('returns null if "flop" is missing', () => {
        const res = flop({ }, dirCtx)
        expect(res).toBeNull()
    })

    it('marks "flop" as used', () => {
        const usedParams = new Set()
        flop({ flop: '' }, { useParam: k => usedParams.add(k), setMetadata: jest.fn })

        expect(usedParams.has('flop')).toBeTruthy()
    })

    it('adds "flop" to the output metadata', () => {
        const metadata = new Map()
        flop({ flop: '' }, { useParam: jest.fn, setMetadata: (k, v) => metadata.set(k, v) })

        expect(metadata.has('flop')).toBeTruthy()
        expect(metadata.get('flop')).toEqual(true)
    })

    describe('transform', () => {
        it('flops the image', async () => {
            const img = sharp(join(__dirname, '../../__tests__/__assets__/pexels-allec-gomes-5195763.jpg'))

            // @ts-ignore
            const out = await applyTransforms(img, [flop({ flop: 'true' }, dirCtx)]).toBuffer()

            expect(out).toMatchFile()
        })
    })
})