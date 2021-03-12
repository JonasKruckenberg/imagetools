import { DirectiveContext } from '../../types'
import { background } from '../background'

describe('background', () => {
    let dirCtx: DirectiveContext
    beforeAll(() => {
        dirCtx = { useParam: jest.fn, addMetadata: jest.fn, warn: jest.fn, error: jest.fn }
    })

    test('keyword: "background"', () => {
        const res = background({ background: 'fff' }, dirCtx)

        expect(res).toEqual('#fff')
    })

    test('null if missing', () => {
        const res = background({}, dirCtx)

        expect(res).toBeUndefined()
    })

    describe('arguments', () => {
        test('empty', () => {
            const res = background({ background: '' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('hex color', () => {
            const res = background({ background: 'fff' }, dirCtx)

            expect(res).toEqual('#fff')
        })
    })
})