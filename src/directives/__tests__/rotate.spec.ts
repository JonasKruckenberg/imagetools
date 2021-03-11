import { DirectiveContext } from '../../types'
import { rotate } from '../rotate'
import { transformImage } from '../../util'
import { toMatchFile } from 'jest-file-snapshot'
import sharp from 'sharp'
import { join } from 'path'

expect.extend({ toMatchFile })

describe('rotate', () => {
    let dirCtx: DirectiveContext
    beforeEach(() => {
        dirCtx = { useParam: jest.fn, setMetadata: jest.fn }
    })

    it('returns null if the arg is not a number', () => {
        const res = rotate({ rotate: 'test' }, dirCtx)
        expect(res).toBeNull()
    })

    it('returns null if the arg is not an integer', () => {
        const res = rotate({ rotate: '0.5' }, dirCtx)
        expect(res).toBeInstanceOf(Function)
    })

    it('returns null if "rotate" is missing', () => {
        const res = rotate({}, dirCtx)
        expect(res).toBeNull()
    })

    it('returns null if the arg is empty', () => {
        const res = rotate({ rotate: '' }, dirCtx)
        expect(res).toBeNull()
    })

    it('returns a the rotate as a number', () => {
        const res = rotate({ rotate: '10' }, dirCtx)
        expect(res).toBeInstanceOf(Function)
    })

    it('marks "rotate" as used', () => {
        const usedParams = new Set()
        rotate({ rotate: '50' }, { useParam: (k) => usedParams.add(k), setMetadata: jest.fn })

        expect(usedParams.has('rotate')).toBeTruthy()
    })

    it('add "rotate" to the output metadata', () => {
        const metadata = new Map()
        rotate({ rotate: '60' }, { useParam: jest.fn, setMetadata: (k, v) => metadata.set(k, v) })

        expect(metadata.has('rotate')).toBeTruthy()
        expect(metadata.get('rotate')).toEqual(60)
    })

    describe('transform', () => {
        it('90', async () => {
            const img = sharp(join(__dirname,'/__assets__/pexels-allec-gomes-5195763.jpg'))

            // @ts-ignore
            const out = await transformImage(img, [rotate({ rotate: '90' }, dirCtx)]).toBuffer()

            expect(out).toMatchFile()
        })

        it('45', async () => {
            const img = sharp(join(__dirname,'/__assets__/pexels-allec-gomes-5195763.jpg'))

            // @ts-ignore
            const out = await transformImage(img, [rotate({ rotate: '45' }, dirCtx)]).toBuffer()

            expect(out).toMatchFile()
        })

        it('45 w/ background', async () => {
            const img = sharp(join(__dirname,'/__assets__/pexels-allec-gomes-5195763.jpg'))

            // @ts-ignore
            const out = await transformImage(img, [rotate({ rotate: '45', background: 'fff' }, dirCtx)]).toBuffer()

            expect(out).toMatchFile()
        })
    })
})