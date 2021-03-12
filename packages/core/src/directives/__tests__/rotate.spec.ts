import { rotate } from '../rotate'
import { DirectiveContext } from '../../types'
import { applyTransforms } from '../../apply-transforms'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { toMatchFile } from 'jest-file-snapshot'

expect.extend({ toMatchFile })

describe('rotate', () => {
    let dirCtx: DirectiveContext
    beforeAll(() => {
        dirCtx = { useParam: jest.fn, addMetadata: jest.fn, warn: jest.fn, error: jest.fn }
    })

    test('keyword "rotate"', () => {
        const res = rotate({ rotate: '90' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    test('missing', () => {
        const res = rotate({}, dirCtx)

        expect(res).toBeUndefined()
    })

    describe('arguments', () => {
        test('invalid', () => {
            const res = rotate({ rotate: 'invalid' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('empty', () => {
            const res = rotate({ rotate: '' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('integer', () => {
            const res = rotate({ rotate: '90' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })

        it('rounds float to int', () => {
            const res = rotate({ rotate: '90.75' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })
    })

    describe('transform', () => {
        let img: Sharp
        beforeEach(() => {
            img = sharp(join(__dirname, '../../__tests__/__assets__/pexels-allec-gomes-5195763.jpg'))
        })

        test('90', async () => {
            //@ts-ignore
            const out = await applyTransforms([rotate({ rotate: '90' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('180', async () => {
            //@ts-ignore
            const out = await applyTransforms([rotate({ rotate: '180' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })

        test('w/ background', async () => {
            //@ts-ignore
            const out = await applyTransforms([rotate({ rotate: '45', background:'0f0' }, dirCtx)], img).toBuffer()

            expect(out).toMatchFile()
        })
    })
})