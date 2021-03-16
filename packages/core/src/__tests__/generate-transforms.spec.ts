import { Directive } from '../types'
import { generateTransforms } from '../lib/generate-transforms'

describe('applyTransforms', () => {
    it('returns the transformations array', () => {
        const options = { width: 300, height: 100 }
        const dirs: Directive[] = [() => i => i]

        const { transforms } = generateTransforms(options, dirs)

        expect(transforms).toBeInstanceOf(Array)
        expect(transforms).toHaveLength(1)
    })

    it('returns the recognized parameters', () => {
        const options = {}
        const dirs: Directive[] = [(_, ctx) => {
            ctx.useParam('foo')
            return (img) => img
        }]

        const { parametersUsed } = generateTransforms(options, dirs)

        expect(parametersUsed.has('foo')).toBeTruthy()
    })

    it('filters out directives that return undefined', () => {
        {
            const options = { width: 300, height: 100 }
            const dirs: Directive[] = [
                () => undefined,
                () => undefined,
                () => undefined
            ]

            const { transforms } = generateTransforms(options, dirs)

            expect(transforms).toBeInstanceOf(Array)
            expect(transforms).toHaveLength(0)
        }
        {
            const options = { width: 300, height: 100 }
            const dirs: Directive[] = [
                () => i => i,
                () => i => i,
                () => undefined
            ]

            const { transforms } = generateTransforms(options, dirs)

            expect(transforms).toBeInstanceOf(Array)
            expect(transforms).toHaveLength(2)
        }
    })
})