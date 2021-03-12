import { blur } from '../blur'
import { DirectiveContext } from "../../types"
import { applyTransforms } from '../../apply-transforms'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { toMatchFile } from 'jest-file-snapshot'

expect.extend({ toMatchFile })

describe('blur', () => {
    let dirCtx: DirectiveContext
    beforeAll(() => {
        dirCtx = { useParam: jest.fn, addMetadata: jest.fn, warn: jest.fn, error: jest.fn }
    })

    test('keyword "blur"', () => {
        const res = blur({ blur: '3' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    test('missing', () => {
        const res = blur({}, dirCtx)

        expect(res).toBeUndefined()

    })

    describe('arguments', () => {
        test('invalid', () => {
            const res = blur({ blur: 'invalid arg' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('empty', () => {
            const res = blur({ blur: '' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })

        test('true', () => {
            const res = blur({ blur: 'true' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })

        test('integer', () => {
            const res = blur({ blur: '5' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })

        test('float', () => {
            const res = blur({ blur: '3.5' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })
    })

    describe('transform', () => {
        let img: Sharp
        beforeEach(() => {
            img = sharp(join(__dirname, '../../__tests__/__assets__/pexels-allec-gomes-5195763.jpg'))
        })

        test('true', async () => {
            //@ts-ignore
            const out = await applyTransforms([blur({ blur: 'true' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('0.5', async () => {
            //@ts-ignore
            const out = await applyTransforms([blur({ blur: '0.5' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('5', async () => {
            //@ts-ignore
            const out = await applyTransforms([blur({ blur: '5' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('50', async () => {
            //@ts-ignore
            const out = await applyTransforms([blur({ blur: '50' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('500',async () => {
            jest.setTimeout(10000) // such a large blur takes for ever
            //@ts-ignore
            const out = await applyTransforms([blur({ blur: '500' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })
    })
})