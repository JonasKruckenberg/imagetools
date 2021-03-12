import { flatten } from '../flatten'
import { DirectiveContext } from "../../types"
import { applyTransforms } from '../../apply-transforms'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { toMatchFile } from 'jest-file-snapshot'

expect.extend({ toMatchFile })

describe('flatten', () => {
    let dirCtx: DirectiveContext
    beforeAll(() => {
        dirCtx = { useParam: jest.fn, addMetadata: jest.fn, warn: jest.fn, error: jest.fn }
    })

    test('keyword "flatten"', () => {
        const res = flatten({ flatten: 'true' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    test('missing', () => {
        const res = flatten({}, dirCtx)

        expect(res).toBeUndefined()
    })

    describe('arguments', () => {
        test('invalid', () => {
            //@ts-expect-error
            const res = flatten({ flatten: 'invalid' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('empty', () => {
            const res = flatten({ flatten: '' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })

        test('true', () => {
            const res = flatten({ flatten: 'true' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })

        test('w/ background', () => {
            const res = flatten({ flatten: 'true', background: 'fff' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })
    })

    describe('transform', () => {
        let img: Sharp
        beforeEach(() => {
            img = sharp(join(__dirname, '../../__tests__/__assets__/pexels-allec-gomes-5195763.jpg'))
        })

        test('empty', async () => {
            //@ts-ignore
            const out = await applyTransforms([flatten({ flatten: '' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('true', async () => {
            //@ts-ignore
            const out = await applyTransforms([flatten({ flatten: 'true' }, dirCtx)], img).toBuffer()
        
            expect(out).toMatchFile()
        })

        test('w/ background', async () => {
            //@ts-ignore
            const out = await applyTransforms([flatten({ flatten: 'true', background: '00f' }, dirCtx)], img).toBuffer()
        
            expect(out).toMatchFile()
        })
    })
})