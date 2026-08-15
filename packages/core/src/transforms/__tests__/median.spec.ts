import { median } from '../median'
import { TransformFactoryContext } from '../../types'
import { applyTransforms } from '../../index'
import sharp, { type Sharp } from 'sharp'
import { join } from 'path'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import { describe, beforeEach, beforeAll, vi, expect, test, it } from 'vitest'
import { consoleLogger } from '../../lib/logger'

expect.extend({ toMatchImageSnapshot })

describe('median', () => {
  let dirCtx: TransformFactoryContext
  beforeAll(() => {
    dirCtx = { useParam: vi.fn, manualSearchParams: new URLSearchParams(), logger: consoleLogger }
  })

  test('keyword "median"', () => {
    const res = median({ median: '3' }, dirCtx)

    expect(res).toBeInstanceOf(Function)
  })

  test('missing', () => {
    const res = median({}, dirCtx)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid', () => {
      const throwingFn = () => median({ median: 'invalid' }, dirCtx)

      expect(throwingFn).toThrow(
        'Invalid median value: "invalid", expected an integer between 1 and 1000, or "false" to disable'
      )
    })

    test('true', () => {
      const throwingFn = () => median({ median: 'true' }, dirCtx)

      expect(throwingFn).toThrow(
        'Invalid median value: "true", expected an integer between 1 and 1000, or "false" to disable'
      )
    })

    test('false', () => {
      const res = median({ median: 'false' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('empty', () => {
      const throwingFn = () => median({ median: '' }, dirCtx)

      expect(throwingFn).toThrow(
        'Invalid median value: "", expected an integer between 1 and 1000, or "false" to disable'
      )
    })

    test('integer', () => {
      const res = median({ median: '3' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    it('rejects a float instead of truncating it', () => {
      const throwingFn = () => median({ median: '3.5' }, dirCtx)

      expect(throwingFn).toThrow(
        'Invalid median value: "3.5", expected an integer between 1 and 1000, or "false" to disable'
      )
    })

    it('rejects a negative size', () => {
      const throwingFn = () => median({ median: '-3' }, dirCtx)

      expect(throwingFn).toThrow(
        'Invalid median value: "-3", expected an integer between 1 and 1000, or "false" to disable'
      )
    })
  })

  describe('transform', () => {
    let img: Sharp
    beforeEach(() => {
      img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
    })

    test('3', async () => {
      const { image } = await applyTransforms([median({ median: '3' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('5', async () => {
      const { image } = await applyTransforms([median({ median: '5' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })
  })
})
