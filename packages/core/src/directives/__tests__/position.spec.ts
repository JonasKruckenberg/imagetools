import { position, PositionValue } from '../position'
import { DirectiveContext } from '../../types'

describe('position', () => {
    let dirCtx: DirectiveContext
    beforeAll(() => {
        dirCtx = { useParam: jest.fn, addMetadata: jest.fn, warn: jest.fn, error: jest.fn }
    })

    test('keyword "position"', () => {
        const res = position({ position: 'top' }, dirCtx)

        expect(res).toEqual('top')
    })

    test('missing', () => {
        const res = position({}, dirCtx)

        expect(res).toBeUndefined()
    })

    describe('shorthands', () => {
        test('invalid', () => { })

        test('valid', () => {
            const shorts = ['top', 'right top', 'right', 'right bottom', 'bottom', 'left bottom', 'left', 'left top']

            for (const s of shorts) {
                const res = position({ [s]: '' }, dirCtx)

                expect(res).toEqual(s)
            }
        })
    })

    describe('arguments', () => {
        test('invalid', () => {
            //@ts-ignore
            const res = position({ position: 'invalid' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('empty', () => {
            //@ts-ignore
            const res = position({ position: '' }, dirCtx)

            expect(res).toBeUndefined()
        })

        test('valid', () => {
            const args: PositionValue[] = ['top', 'right top', 'right', 'right bottom', 'bottom', 'left bottom', 'left', 'left top',
                'north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest', 'center', 'centre',
                'entropy', 'attention']

            for (const arg of args) {
                const res = position({ position: arg }, dirCtx)

                expect(res).toEqual(arg)
            }
        })
    })
})