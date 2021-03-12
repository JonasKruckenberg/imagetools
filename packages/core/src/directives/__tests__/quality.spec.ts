import { quality } from '../quality'
import { DirectiveContext } from '../../types'

describe('quality', () => {
    let dirCtx: DirectiveContext
    beforeAll(() => {
        dirCtx = { useParam: jest.fn, addMetadata: jest.fn, warn: jest.fn, error: jest.fn }
    })

    test('keyword "quality"', () => {
        const res = quality({ quality: '3' }, dirCtx)

        expect(res).toEqual(3)
    })

    test('missing', () => {
        const res = quality({}, dirCtx)

        expect(res).toBeUndefined()
    })

    describe('arguments', () => {
        test('invalid', () => {
            const res = quality({ quality: 'invalid' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('empty', () => {
            const res = quality({ quality: '' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('integer', () => {
            const res = quality({ quality: '3' }, dirCtx)

            expect(res).toEqual(3)
        })

        it('rounds float to int', () => {
            const res = quality({ quality: '3.5' }, dirCtx)

            expect(res).toEqual(3)
        })
    })
})