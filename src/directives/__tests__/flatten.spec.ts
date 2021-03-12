import { flatten } from '../flatten'
import { applyTransforms } from '../../util'
import { toMatchFile } from 'jest-file-snapshot'
import sharp from 'sharp'
import { join } from 'path'
import { DirectiveContext } from '../../types'

expect.extend({ toMatchFile })

describe('flatten', () => {
    let dirCtx: DirectiveContext
    beforeEach(() => {
        dirCtx = { useParam: jest.fn, setMetadata: jest.fn }
    })

    it('returns a function when the argument is empty', () => {
        const res = flatten({ flatten: '' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeInstanceOf(Function)
    })

    it('returns a function when the argument is true', () => {
        const res = flatten({ flatten: 'true' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeInstanceOf(Function)
    })

    it('returns null when "flatten" is missing', () => {
        //@ts-expect-error
        const res = flatten({ flatten: 'invalid' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeNull()
    })

    it('marks the "flatten" parameter as used', () => {
        const usedParams = new Set()
        flatten({ flatten: 'true' }, { useParam: k => usedParams.add(k), setMetadata: jest.fn })

        expect(usedParams.has('flatten')).toBeTruthy()
    })

    it('add "flatten" to the output metadata', () => {
        const metadata = new Map()
        flatten({ flatten: 'true' }, { useParam: jest.fn, setMetadata: (k, v) => metadata.set(k, v) })

        expect(metadata.has('flatten')).toBeTruthy()
        expect(metadata.get('flatten')).toEqual(true)
    })

    it('uses the "background" directive', () => {
        const metadata = new Map()
        flatten({ flatten: 'true', background: 'fff' }, { useParam: jest.fn, setMetadata: (k, v) => metadata.set(k, v) })

        expect(metadata.has('background')).toBeTruthy()
        expect(metadata.get('background')).toEqual('fff')
    })

    describe('transform', () => {
        test('boolean', async () => {
            const img = sharp(join(__dirname, '../../__tests__/__assets__/pexels-allec-gomes-5195763.jpg'))

            //@ts-ignore
            const out = await applyTransforms(img, [flatten({ flatten: 'true' }, dirCtx)]).toBuffer()

            expect(out).toMatchFile()
        })

        test('w/ background', async () => {
            const img = sharp(join(__dirname, '../../__tests__/__assets__/pexels-allec-gomes-5195763.jpg'))

            //@ts-ignore
            const out = await applyTransforms(img, [flatten({ flatten: 'true', background: 'fff' }, dirCtx)]).toBuffer()

            expect(out).toMatchFile()
        })
    })
})