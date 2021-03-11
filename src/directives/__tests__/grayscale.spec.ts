import { grayscale } from '../grayscale'
import { DirectiveContext } from '../../types'
import { applyTransforms } from '../../util'
import { toMatchFile } from 'jest-file-snapshot'
import { join } from 'path'
import sharp from 'sharp'

expect.extend({ toMatchFile })

describe('grayscale', () => {
    let dirCtx: DirectiveContext
    beforeEach(() => {
        dirCtx = { useParam: jest.fn, setMetadata: jest.fn }
    })

    it('returns a function when the argument is empty', () => {
        const res = grayscale({ grayscale: '' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })
    it('returns a function when the argument is true', () => {
        const res = grayscale({ grayscale: 'true' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })
    it('returns null when the argument is invalid', () => {
        const res = grayscale({ grayscale: 'invalid' }, dirCtx)

        expect(res).toBeNull()
    })
    it('marks the parameter as used', () => {
        const usedParams = new Set()
        grayscale({ grayscale: '' }, { useParam: k => usedParams.add(k), setMetadata: jest.fn })

        expect(usedParams.has('grayscale')).toBeTruthy()
    })
    it('add "grayscale" to the output metadata', () => {
        const metadata = new Map()
        grayscale({ grayscale: '' }, { useParam: jest.fn, setMetadata: (k, v) => metadata.set(k, v) })

        expect(metadata.has('grayscale')).toBeTruthy()
        expect(metadata.get('grayscale')).toEqual(true)
    })

    describe('transform', () => {
        it('grayscales the image', async () => {
            const img = sharp(join(__dirname, '../../__tests__/__assets__/pexels-allec-gomes-5195763.jpg'))

            //@ts-ignore
            const out = await applyTransforms(img, [grayscale({ grayscale: 'true' }, dirCtx)]).toBuffer()

            expect(out).toMatchFile()
        })
    })
})