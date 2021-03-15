import { Directive } from '../types'
import { generateTransforms } from '../index'

describe('applyTransforms', () => {
    it('returns the transformations array', () => {
        const options = { width: 300, height: 100 }
        const dirs:Record<string,Directive> = {
            mock: () => i => i // a mock directive
        }

        const { transforms } = generateTransforms(options, dirs)

        expect(transforms).toBeInstanceOf(Array)
        expect(transforms).toHaveLength(1)
    })

    it('returns the collected metadata', () => {
        const options = {}
        const dirs:Record<string,Directive> = {
            mock: (_, ctx) => {
                ctx.addMetadata('foo', 'bar')
                return (img) => img
            }
        }

        const { metadata } = generateTransforms(options, dirs)

        expect(metadata).toHaveProperty('foo', 'bar')
    })

    it('returns the recognized parameters', () => {
        const options = {}
        const dirs:Record<string,Directive> = {
            mock: (_, ctx) => {
                ctx.useParam('foo')
                return (img) => img
            }
        }

        const { parametersUsed } = generateTransforms(options, dirs)

        expect(parametersUsed.has('foo')).toBeTruthy()
    })

    it('filters out directives that return undefined', () => {
        {
            const options = { width: 300, height: 100 }
            const dirs:Record<string,Directive> = {
                'm1': () => undefined,
                'm2': () => undefined,
                'm3': () => undefined
            }

            const { transforms } = generateTransforms(options, dirs)

            expect(transforms).toBeInstanceOf(Array)
            expect(transforms).toHaveLength(0)
        }
        {
            const options = { width: 300, height: 100 }
            const dirs:Record<string,Directive> = {
                'm1': () => i => i,
                'm2': () => i => i,
                'm3': () => undefined
            }

            const { transforms } = generateTransforms(options, dirs)

            expect(transforms).toBeInstanceOf(Array)
            expect(transforms).toHaveLength(2)
        }
    })
})