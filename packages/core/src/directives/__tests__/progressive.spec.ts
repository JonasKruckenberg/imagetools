import { DirectiveContext } from '../../types'
import { progressive } from '../progressive'

describe('progressive', () => {
    let dirCtx: DirectiveContext
    beforeAll(() => {
        dirCtx = { useParam: jest.fn, addMetadata: jest.fn, warn: jest.fn }
    })

    test('keyword "progressive"', () => {
        const res = progressive({ progressive: 'true' }, dirCtx)

        expect(res).toEqual(true)
    })

    test('missing', () => {
        const res = progressive({}, dirCtx)

        expect(res).toBeUndefined()
    })

    describe('arguments', () => {
        test('invalid', () => {
            //@ts-expect-error
            const res = progressive({ progressive: 'invalid' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('empty', () => {
            const res = progressive({ progressive: '' }, dirCtx)

            expect(res).toEqual(true)
        })

        test('true', () => {
            const res = progressive({ progressive: 'true' }, dirCtx)

            expect(res).toEqual(true)
        })
    })
})