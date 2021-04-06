import { TransformFactoryContext } from '../../types'
import { flip } from '../flip'
import { applyTransforms } from '../../index'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { toMatchFile } from 'jest-file-snapshot'

expect.extend({ toMatchFile })

describe('flip', () => {
    let dirCtx: TransformFactoryContext
    beforeAll(() => {
        dirCtx = { useParam: jest.fn, warn: jest.fn }
    })

    test('keyword "flip"', () => {
        const res = flip({ flip: 'true' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    test('missing', () => {
        const res = flip({}, dirCtx)

        expect(res).toBeUndefined()
    })

    describe('arguments', () => {
        test('invalid', () => {
            //@ts-expect-error
            const res = flip({ flip: 'invalid' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('empty', () => {
            const res = flip({ flip: '' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })

        test('true', () => {
            const res = flip({ flip: 'true' }, dirCtx)

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
            const { image, metadata } = await applyTransforms([flip({ flip: '' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchFile()
        })

        test('true', async () => {
            //@ts-ignore
            const { image, metadata } = await applyTransforms([flip({ flip: 'true' }, dirCtx)], img)

            expect(await image.toBuffer()).toMatchFile()
        })
    })
})