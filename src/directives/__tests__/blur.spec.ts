import { blur } from '../blur'
import { applyTransforms } from '../../util'
import { toMatchFile } from 'jest-file-snapshot'
import sharp from 'sharp'
import { DirectiveContext } from '../../types'
import { join } from 'path'

expect.extend({ toMatchFile })

describe('blur', () => {
    let dirCtx: DirectiveContext
    beforeEach(() => {
        dirCtx = { useParam: jest.fn, setMetadata: jest.fn }
    })

    it('returns null if the arg is smaller than 0.3', () => {
        const res = blur({ blur: '0.1' }, dirCtx)
        expect(res).toBeNull()
    })

    it('returns null if the arg is greater than 1000', () => {
        const res1 = blur({ blur: '1001' }, dirCtx)
        expect(res1).toBeNull()

        const res2 = blur({ blur: '2035' }, dirCtx)
        expect(res2).toBeNull()
    })

    it('returns null if the arg is not a number', () => {
        const res = blur({ blur: 'test' }, dirCtx)
        expect(res).toBeNull()
    })

    it('returns null if "blur" is missing', () => {
        const res = blur({}, dirCtx)
        expect(res).toBeNull()
    })

    it('returns a function', () => {
        const res = blur({ blur: '10' }, dirCtx)
        expect(res).toBeInstanceOf(Function)
    })

    it('returns a function if the arg is empty', () => {
        const res = blur({ blur: '' }, dirCtx)
        expect(res).toBeInstanceOf(Function)
    })

    it('returns a function if the arg is "true"', () => {
        const res = blur({ blur: 'true' }, dirCtx)
        expect(res).toBeInstanceOf(Function)
    })

    it('marks "blur" as used', () => {
        const usedParams = new Set()
        blur({ blur: 'true' }, { useParam: (k) => usedParams.add(k), setMetadata: jest.fn })

        expect(usedParams.has('blur')).toBeTruthy()
    })

    it('add "blur" to the output metadata', () => {
        const m1 = new Map()
        blur({ blur: 'true' }, { useParam: jest.fn, setMetadata: (k, v) => m1.set(k, v) })

        expect(m1.has('blur')).toBeTruthy()
        expect(m1.get('blur')).toEqual(true)

        const m2 = new Map()
        blur({ blur: '0.5' }, { useParam: jest.fn, setMetadata: (k, v) => m2.set(k, v) })

        expect(m2.has('blur')).toBeTruthy()
        expect(m2.get('blur')).toEqual(0.5)
    })

    describe('transform', () => {
        test('boolean', async () => {
            const img = sharp(join(__dirname, '../../__tests__/__assets__/pexels-allec-gomes-5195763.jpg'))

            //@ts-ignore
            const out = await applyTransforms(img, [blur({ blur: '' }, dirCtx)]).toBuffer()

            expect(out).toMatchFile()
        })

        test('5', async () => {
            const img = sharp(join(__dirname, '../../__tests__/__assets__/pexels-allec-gomes-5195763.jpg'))
            
            //@ts-ignore
            const out = await applyTransforms(img, [blur({ blur: '5' }, dirCtx)]).toBuffer()
            
            expect(out).toMatchFile()
        })
        
        test('50', async () => {
            const img = sharp(join(__dirname, '../../__tests__/__assets__/pexels-allec-gomes-5195763.jpg'))
            
            //@ts-ignore
            const out = await applyTransforms(img, [blur({ blur: '50' }, dirCtx)]).toBuffer()
            
            expect(out).toMatchFile()
        })

        test('500', async () => {
            jest.setTimeout(200000)// such a high blur number takes longer than 5 sec
            const img = sharp(join(__dirname, '../../__tests__/__assets__/pexels-allec-gomes-5195763.jpg'))
    
            //@ts-ignore
            const out = await applyTransforms(img, [blur({ blur: '500' }, dirCtx)]).toBuffer()
    
            expect(out).toMatchFile()
        })
    })
})