import { TransformFactory } from '../types'
import { generateTransforms } from '../lib/generate-transforms'
import { describe, it, expect } from 'vitest'

describe('applyTransforms', () => {
  it('returns the transformations array', () => {
    const options = { width: 300, height: 100 }
    const dirs: TransformFactory[] = [() => (i) => i]

    const { transforms } = generateTransforms(options, dirs)

    expect(transforms).toBeInstanceOf(Array)
    expect(transforms).toHaveLength(1)
  })

  it('returns the recognized parameters', () => {
    const options = {}
    const dirs: TransformFactory[] = [
      (_, ctx) => {
        ctx.useParam('foo')
        return (img) => img
      }
    ]

    const { parametersUsed } = generateTransforms(options, dirs)

    expect(parametersUsed.has('foo')).toBeTruthy()
  })

  it('filters out transforms that return undefined', () => {
    {
      const options = { width: 300, height: 100 }
      const dirs: TransformFactory[] = [() => undefined, () => undefined, () => undefined]

      const { transforms } = generateTransforms(options, dirs)

      expect(transforms).toBeInstanceOf(Array)
      expect(transforms).toHaveLength(0)
    }
    {
      const options = { width: 300, height: 100 }
      const dirs: TransformFactory[] = [() => (i) => i, () => (i) => i, () => undefined]

      const { transforms } = generateTransforms(options, dirs)

      expect(transforms).toBeInstanceOf(Array)
      expect(transforms).toHaveLength(2)
    }
  })
})
