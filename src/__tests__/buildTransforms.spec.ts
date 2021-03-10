import { Directive } from '../types'
import { buildTransforms } from '../util'

describe('buildTransforms', () => {
    it('returns the transformations array', () => {
        const options = { width: 300, height: 100 }
        const dirs = [() => () => { }] // a mock directive

        const { transforms } = buildTransforms(options, dirs)

        expect(transforms).toBeInstanceOf(Array)
        expect(transforms).toHaveLength(1)
    })

    it('returns the collected metadata', () => {
        const options = {}
        const dirs: Directive[] = [
            (_, ctx) => {
                ctx.setMetadata('foo', 'bar')
                return (img) => img
            }
        ]

        const { metadata } = buildTransforms(options, dirs)

        expect(metadata).toHaveProperty('foo', 'bar')
    })

    it('returns the recognized parameters', () => {
        const options = {}
        const dirs: Directive[] = [
            (_, ctx) => {
                ctx.useParam('foo')
                return (img) => img
            }
        ]

        const { parametersUsed } = buildTransforms(options, dirs)

        expect(parametersUsed.has('foo')).toBeTruthy()
    })

    it('filters out directives that returns null', () => {
        {
            const options = { width: 300, height: 100 }
            const dirs = [() => null, () => null, () => null]

            const { transforms } = buildTransforms(options, dirs)

            expect(transforms).toBeInstanceOf(Array)
            expect(transforms).toHaveLength(0)
        }
        {
            const options = { width: 300, height: 100 }
            const dirs = [() => () => {}, () => () => {}, () => null]

            const { transforms } = buildTransforms(options, dirs)

            expect(transforms).toBeInstanceOf(Array)
            expect(transforms).toHaveLength(2)
        }
    })
})