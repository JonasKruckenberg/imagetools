import { median } from '../median'
import { join } from 'path'
import sharp from 'sharp'
import { DirectiveContext } from '../../types'
import { transformImage } from '../../util'
import { applyTransforms } from '../../util'
import { toMatchFile } from 'jest-file-snapshot'

expect.extend({ toMatchFile })

describe('median', () => {
    let dirCtx: DirectiveContext
    beforeEach(() => {
        dirCtx = { useParam: jest.fn, setMetadata: jest.fn }
    })
    it('returns a function when the argument is a number', () => {
        const res = median({ median: '3' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })
    it('returns null when the argument is invalid', () => {
        const res = median({ median: 'foobar' }, dirCtx)

        expect(res).toBeNull()
    })
    it('returns null when the parameter is missing', () => {
        const res = median({}, dirCtx)

        expect(res).toBeNull()
    })
    it('marks the parameter as used', () => {
        const usedParams = new Set()
        median({ median: '3' }, { useParam: k => usedParams.add(k), setMetadata: jest.fn })

        expect(usedParams.has('median')).toBeTruthy()
    })
    it('adds the parameter to the output metadata', () => {
        const metadata = new Map()
        median({ median: '3' }, { useParam: jest.fn, setMetadata: (k, v) => metadata.set(k, v) })

        expect(metadata.has('median')).toBeTruthy()
        expect(metadata.get('median')).toEqual(3)
    })

    describe('transform', () => {
        test('3', async () => {
            const img = sharp(join(__dirname, '/__assets__/pexels-allec-gomes-5195763.jpg'))

            //@ts-ignore
            const out = await transformImage(img, [median({ median: '3' }, dirCtx)]).toBuffer()
            const out = await applyTransforms(img, [median({ median: '3' }, dirCtx)]).toBuffer()

            expect(out).toMatchFile()
        })
    })
})