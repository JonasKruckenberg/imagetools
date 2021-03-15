import { median } from '../median'
import { DirectiveContext } from '../../types'
import { applyTransforms } from '../../index'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { toMatchFile } from 'jest-file-snapshot'

expect.extend({ toMatchFile })

describe('median', () => {
    let dirCtx: DirectiveContext
    beforeAll(() => {
        dirCtx = { useParam: jest.fn, addMetadata: jest.fn, warn: jest.fn }
    })

    test('keyword "median"', () => {
        const res = median({ median: '3' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    test('missing', () => {
        const res = median({}, dirCtx)

        expect(res).toBeUndefined()
    })

    describe('arguments', () => {
        test('invalid', () => {
            const res = median({ median: 'invalid' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('empty', () => {
            const res = median({ median: '' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('integer', () => {
            const res = median({ median: '3' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })

        it('rounds float to int', () => {
            const res = median({ median: '3.5' }, dirCtx)

            expect(res).toBeInstanceOf(Function)
        })
    })

    describe('transform', () => {
        let img: Sharp
        beforeEach(() => {
            img = sharp(join(__dirname, '../../__tests__/__assets__/pexels-allec-gomes-5195763.jpg'))
        })

        test('3', async () => {
            //@ts-ignore
            const { data, info } = await applyTransforms([median({ median: '3' }, dirCtx)], img)

            expect(data).toMatchFile()
        })

        test('5', async () => {
            //@ts-ignore
            const { data, info } = await applyTransforms([median({ median: '5' }, dirCtx)], img)

            expect(data).toMatchFile()
        })
    })
})