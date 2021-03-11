import { tint } from '../tint'
import { join } from 'path'
import sharp from 'sharp'
import { DirectiveContext } from '../../types'
import { applyTransforms } from '../../util'
import { toMatchFile } from 'jest-file-snapshot'

expect.extend({ toMatchFile })

describe('tint', () => {
    let dirCtx: DirectiveContext
    beforeEach(() => {
        dirCtx = { useParam: jest.fn, setMetadata: jest.fn }
    })

    it('returns a function when the argument is a string', () => {
        const res = tint({ tint: '#fff' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    it('returns null when the parameter is missing', () => {
        const res = tint({}, dirCtx)

        expect(res).toBeNull()
    })

    it('marks the parameter as used', () => {
        const usedParams = new Set()
        tint({ tint: '#fff' }, { useParam: k => usedParams.add(k), setMetadata: jest.fn })

        expect(usedParams.has('tint')).toBeTruthy()
    })

    it('adds tint to the output metadata', () => {
        const metadata = new Map()
        tint({ tint: '#fff' }, { useParam: jest.fn, setMetadata: (k, v) => metadata.set(k, v) })

        expect(metadata.has('tint')).toBeTruthy()
        expect(metadata.get('tint')).toEqual('#fff')
    })

    describe('transform', () => {
        test('red', async () => {
            const img = sharp(join(__dirname, '../../__tests__/__assets__/pexels-allec-gomes-5195763.jpg'))

            //@ts-ignore
            const out = await applyTransforms(img, [tint({ tint: 'f00' }, dirCtx)]).toBuffer()

            expect(out).toMatchFile()
        })
        test('green', async () => {
            const img = sharp(join(__dirname, '../../__tests__/__assets__/pexels-allec-gomes-5195763.jpg'))

            //@ts-ignore
            const out = await applyTransforms(img, [tint({ tint: '0f0' }, dirCtx)]).toBuffer()

            expect(out).toMatchFile()
        })
        test('blue', async () => {
            const img = sharp(join(__dirname, '../../__tests__/__assets__/pexels-allec-gomes-5195763.jpg'))

            //@ts-ignore
            const out = await applyTransforms(img, [tint({ tint: '00f' }, dirCtx)]).toBuffer()

            expect(out).toMatchFile()
        })
    })
})