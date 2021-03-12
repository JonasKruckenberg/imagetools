import { Directive } from '../types'
import { generateTransforms } from '../generate-transforms'

describe('applyTransforms', () => {
    it('returns the transformations array', () => {
        const options = { width: 300, height: 100 }
        const dirs = [() => i => i] as Directive[] // a mock directive

        const { transforms } = generateTransforms(options, dirs)

        expect(transforms).toBeInstanceOf(Array)
        expect(transforms).toHaveLength(1)
    })

    it('returns the collected metadata', () => {
        const options = {}
        const dirs: Directive[] = [
            (_, ctx) => {
                ctx.addMetadata('foo', 'bar')
                return (img) => img
            }
        ]

        const { metadata } = generateTransforms(options, dirs)

        expect(metadata).toHaveProperty('foo', 'bar')
    })

    it('returns the recognized parameters', () => {
        const options = {}
        const dirs = [
            (_, ctx) => {
                ctx.useParam('foo')
                return (img) => img
            }
        ] as Directive[]

        const { parametersUsed } = generateTransforms(options, dirs)

        expect(parametersUsed.has('foo')).toBeTruthy()
    })

    it('filters out directives that return undefined', () => {
        {
            const options = { width: 300, height: 100 }
            const dirs = [() => undefined, () => undefined, () => undefined] as Directive[]

            const { transforms } = generateTransforms(options, dirs)

            expect(transforms).toBeInstanceOf(Array)
            expect(transforms).toHaveLength(0)
        }
        {
            const options = { width: 300, height: 100 }
            const dirs = [() => () => { }, () => () => { }, () => undefined] as Directive[]

            const { transforms } = generateTransforms(options, dirs)

            expect(transforms).toBeInstanceOf(Array)
            expect(transforms).toHaveLength(2)
        }
    })
})