import { invert } from '../invert'
import { applyTransforms } from '../../util'
import { toMatchFile } from 'jest-file-snapshot'
import { join } from 'path'
import sharp from 'sharp'
import { DirectiveContext } from '../../types'

expect.extend({ toMatchFile })

describe('invert', () => {
    let dirCtx: DirectiveContext
    beforeEach(() => {
        dirCtx = { useParam: jest.fn, setMetadata: jest.fn }
    })
    
    it('returns a function when invert is empty', () => {
        const res = invert({ invert: '' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    it('returns a function when invert is true', () => {
        const res = invert({ invert: 'true' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    it('returns null when invert is anything else', () => {
        const r1 = invert({ invert: 'null' }, dirCtx)

        expect(r1).toBeNull()

        const r2 = invert({ invert: 'anything else' }, dirCtx)

        expect(r2).toBeNull()
    })

    it('returns null if "invert" is missing', () => {
        const res = invert({ }, dirCtx)
        expect(res).toBeNull()
    })

    it('marks "invert" as used', () => {
        const usedParams = new Set()
        invert({ invert: '' }, { useParam: k => usedParams.add(k), setMetadata: jest.fn })

        expect(usedParams.has('invert')).toBeTruthy()
    })

    it('adds "invert" to the output metadata', () => {
        const metadata = new Map()
        invert({ invert: '' }, { useParam: jest.fn, setMetadata: (k, v) => metadata.set(k, v) })

        expect(metadata.has('invert')).toBeTruthy()
        expect(metadata.get('invert')).toEqual(true)
    })

    describe('transform',() => {
        test('inverts the image', async () => {
            const img = sharp(join(__dirname, '../../__tests__/__assets__/pexels-allec-gomes-5195763.jpg'))

            //@ts-ignore
            const out = await applyTransforms(img, [invert({ invert: 'true' }, dirCtx)]).toBuffer()

            expect(out).toMatchFile()
        })
    })
})