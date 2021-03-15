import { fit, FitValue } from '../fit'
import { DirectiveContext } from "../../types"

describe('fit', () => {
    let dirCtx: DirectiveContext
    beforeAll(() => {
        dirCtx = { useParam: jest.fn, addMetadata: jest.fn, warn: jest.fn }
    })

    test('keyword "fit"', () => {
        const res = fit({ fit: 'cover' }, dirCtx)

        expect(res).toEqual('cover')
    })

    test('missing', () => {
        const res = fit({}, dirCtx)

        expect(res).toBeUndefined()
    })

    describe('shorthands', () => {
        test('invalid', () => {
            const shorts: FitValue[] = ['cover', 'contain', 'fill', 'inside', 'outside']

            for (const short of shorts) {
                const res = fit({ [short]: 'invalid' }, dirCtx)

                expect(res).toBeUndefined()
            }
        })

        test('valid', () => {
            const shorts: FitValue[] = ['cover', 'contain', 'fill', 'inside', 'outside']

            for (const short of shorts) {
                const res = fit({ [short]: '' }, dirCtx)

                expect(res).toEqual(short)
            }
        })
    })

    describe('arguments', () => {
        test('invalid', () => {
            //@ts-ignore
            const res = fit({ fit: 'invalid' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('empty', () => {
            //@ts-expect-error
            const res = fit({ fit: '' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('valid', () => {
            const args: FitValue[] = ['cover', 'contain', 'fill', 'inside', 'outside']

            for (const arg of args) {
                const res = fit({ fit: arg }, dirCtx)

                expect(res).toEqual(arg)
            }
        })
    })
})