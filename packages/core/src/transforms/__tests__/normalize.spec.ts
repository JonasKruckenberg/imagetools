import { normalize } from '../normalize'
import { TransformFactoryContext } from '../../types'
import { applyTransforms } from '../../index'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { toMatchImageSnapshot } from 'jest-image-snapshot'

expect.extend({ toMatchImageSnapshot })

describe('normalize', () => {
    let dirCtx: TransformFactoryContext
    beforeAll(() => {
        dirCtx = { useParam: jest.fn, warn: jest.fn }
    })

    test('keyword "normalize"', () => {
        const res = normalize({ normalize: 'true' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    test('missing', () => {
        const res = normalize({}, dirCtx)

        expect(res).toBeUndefined()
    })

    describe('arguments', () => {
        test('invalid', () => {
            //@ts-expect-error
            const res = normalize({ normalize: 'invalid' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('empty', () => {
            const res = normalize({ normalize: '' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })

        test('true', () => {
            const res = normalize({ normalize: 'true' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })
    })

    describe('transform', () => {
        let img: Sharp
        beforeEach(() => {
            img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
        })

        test('empty', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([normalize({ normalize: '' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchImageSnapshot()
        })

        test('true', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([normalize({ normalize: 'true' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchImageSnapshot()
        })
    })
})