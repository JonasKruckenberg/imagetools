import { grayscale } from '../grayscale'
import { DirectiveContext } from '../../types'
import { applyTransforms } from '../../apply-transforms'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { toMatchFile } from 'jest-file-snapshot'

expect.extend({ toMatchFile })

describe('grayscale', () => {
    let dirCtx: DirectiveContext
    beforeAll(() => {
        dirCtx = { useParam: jest.fn, addMetadata: jest.fn, warn: jest.fn, error: jest.fn }
    })

    test('keyword "grayscale"', () => {
        const res = grayscale({ grayscale: 'true' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    test('missing', () => {
        const res = grayscale({}, dirCtx)

        expect(res).toBeUndefined()
    })

    describe('arguments', () => {
        test('invalid', () => {
            //@ts-expect-error
            const res = grayscale({ grayscale: 'invalid' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('empty', () => {
            const res = grayscale({ grayscale: '' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })

        test('true', () => {
            const res = grayscale({ grayscale: 'true' }, dirCtx)

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
            const out = await applyTransforms([grayscale({ grayscale: '' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('true', async () => {
            //@ts-ignore
            const out = await applyTransforms([grayscale({ grayscale: 'true' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })
    })
})