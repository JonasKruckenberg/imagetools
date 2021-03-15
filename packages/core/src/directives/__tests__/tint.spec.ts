import { tint } from '../tint'
import { DirectiveContext } from '../../types'
import { applyTransforms } from '../../index'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { toMatchFile } from 'jest-file-snapshot'

expect.extend({ toMatchFile })

describe('tint', () => {
    let dirCtx: DirectiveContext
    beforeAll(() => {
        dirCtx = { useParam: jest.fn, addMetadata: jest.fn, warn: jest.fn }
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
            const { data, info } = await applyTransforms([tint({ tint: 'f00' }, dirCtx)], img)

            expect(data).toMatchFile()
        })

        test('green', async () => {
            //@ts-ignore
            const { data, info } = await applyTransforms([tint({ tint: '0f0' }, dirCtx)], img)

            expect(data).toMatchFile()
        })

        test('blue', async () => {
            //@ts-ignore
            const { data, info } = await applyTransforms([tint({ tint: '00f' }, dirCtx)], img)

            expect(data).toMatchFile()
        })
    })
})