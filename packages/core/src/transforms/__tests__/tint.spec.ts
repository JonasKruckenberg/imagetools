import { tint } from '../tint'
import { TransformFactoryContext } from '../../types'
import { applyTransforms } from '../../index'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { toMatchImageSnapshot } from 'jest-image-snapshot'

expect.extend({ toMatchImageSnapshot })

describe('tint', () => {
    let dirCtx: TransformFactoryContext
    beforeAll(() => {
        dirCtx = { useParam: jest.fn, warn: jest.fn }
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
            img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
        })

        test('red', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([tint({ tint: 'f00' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchImageSnapshot()
        })

        test('green', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([tint({ tint: '0f0' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchImageSnapshot()
        })

        test('blue', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([tint({ tint: '00f' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchImageSnapshot()
        })
    })
})