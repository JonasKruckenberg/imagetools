import { kernel, KernelValue } from '../kernel'
import { DirectiveContext } from '../../types'

describe('kernel', () => {
    let dirCtx: DirectiveContext
    beforeAll(() => {
        dirCtx = { useParam: jest.fn, addMetadata: jest.fn, warn: jest.fn }
    })

    test('keyword "kernel"', () => {
        //@ts-ignore
        const res = kernel({ kernel: 'cubic' }, dirCtx)

        expect(res).toEqual('cubic')
    })

    test('missing', () => {
        const res = kernel({}, dirCtx)

        expect(res).toBeUndefined()
    })

    describe('arguments', () => {
        test('invalid', () => {
            //@ts-ignore
            const res = kernel({ kernel: 'invalid' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('empty', () => {
            //@ts-expect-error
            const res = kernel({ kernel: '' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('valid', () => {
            const args: KernelValue[] = ['nearest', 'cubic', 'mitchell', 'lanczos2', 'lanczos3']

            for (const arg of args) {
                const res = kernel({ kernel: arg }, dirCtx)

                expect(res).toEqual(arg)
            }
        })
    })
})