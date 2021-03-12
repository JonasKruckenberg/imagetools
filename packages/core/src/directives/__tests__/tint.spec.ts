import { tint } from '../tint'
import { DirectiveContext } from '../../types'
import { applyTransforms } from '../../apply-transforms'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { toMatchFile } from 'jest-file-snapshot'

expect.extend({ toMatchFile })

describe('tint', () => {
    let dirCtx: DirectiveContext
    beforeAll(() => {
        dirCtx = { useParam: jest.fn, addMetadata: jest.fn, warn: jest.fn, error: jest.fn }
    })

    test('keyword "tint"', () => {
        const res = tint({ tint: 'fff' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    test('missing', () => {
        const res = tint({}, dirCtx)

        expect(res).toBeUndefined()
    })

    describe('arguments', () => {
        test('empty', () => {
            const res = tint({ tint: '' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('hex color', () => {
            const res = tint({ tint: 'fff' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })
    })

    describe('transform', () => {
        let img: Sharp
        beforeEach(() => {
            img = sharp(join(__dirname, '../../__tests__/__assets__/pexels-allec-gomes-5195763.jpg'))
        })

        test('red', async () => {
            //@ts-ignore
            const out = await applyTransforms([tint({ tint: 'f00' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('green', async () => {
            //@ts-ignore
            const out = await applyTransforms([tint({ tint: '0f0' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('blue', async () => {
            //@ts-ignore
            const out = await applyTransforms([tint({ tint: '00f' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })
    })
})