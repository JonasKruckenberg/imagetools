import { TransformFactory } from '../types'
import { generateTransforms } from '../lib/generate-transforms'
import { describe, it, expect, vi, afterEach } from 'vitest'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('applyTransforms', () => {
  it('returns the transformations array', () => {
    const options = { width: 300, height: 100 }
    const dirs: TransformFactory[] = [() => (i) => i]

    const { transforms } = generateTransforms(options, dirs, new URLSearchParams())

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

    const { parametersUsed } = generateTransforms(options, dirs, new URLSearchParams())

    expect(parametersUsed.has('foo')).toBeTruthy()
  })

  it('filters out transforms that return undefined', () => {
    {
      const options = { width: 300, height: 100 }
      const dirs: TransformFactory[] = [() => undefined, () => undefined, () => undefined]

      const { transforms } = generateTransforms(options, dirs, new URLSearchParams())

      expect(transforms).toBeInstanceOf(Array)
      expect(transforms).toHaveLength(0)
    }
    {
      const options = { width: 300, height: 100 }
      const dirs: TransformFactory[] = [() => (i) => i, () => (i) => i, () => undefined]

      const { transforms } = generateTransforms(options, dirs, new URLSearchParams())

      expect(transforms).toBeInstanceOf(Array)
      expect(transforms).toHaveLength(2)
    }
  })

  it('passes the logger on to transforms', () => {
    const logger = { info: vi.fn(), warn: vi.fn(), error: vi.fn() }
    const dirs: TransformFactory[] = [
      (_, c) => {
        c.logger.info('Info message')
        c.logger.warn('Warn message')
        c.logger.error('Error message')
        return undefined
      }
    ]

    generateTransforms({}, dirs, new URLSearchParams(), logger)

    expect(logger.info).toHaveBeenCalledWith('Info message')
    expect(logger.warn).toHaveBeenCalledWith('Warn message')
    expect(logger.error).toHaveBeenCalledWith('Error message')
  })

  it('passes a console logger by default', () => {
    vi.spyOn(console, 'info')
    vi.spyOn(console, 'warn')
    vi.spyOn(console, 'error')

    generateTransforms(
      {},
      [
        (_, c) => {
          c.logger.info('Info message')
          c.logger.warn('Warn message')
          c.logger.error('Error message')
          return undefined
        }
      ],
      new URLSearchParams()
    )

    expect(console.info).toHaveBeenCalledWith('Info message')
    expect(console.warn).toHaveBeenCalledWith('Warn message')
    expect(console.error).toHaveBeenCalledWith('Error message')
  })
})
