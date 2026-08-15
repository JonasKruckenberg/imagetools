import { rotate } from '../rotate'
import { TransformFactoryContext } from '../../types'
import { applyTransforms } from '../../index'
import sharp, { type Sharp } from 'sharp'
import { join } from 'path'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import { describe, beforeEach, beforeAll, vi, expect, test, it } from 'vitest'
import { consoleLogger } from '../../lib/logger'

expect.extend({ toMatchImageSnapshot })

describe('rotate', () => {
  let dirCtx: TransformFactoryContext
  beforeAll(() => {
    dirCtx = { useParam: vi.fn, manualSearchParams: new URLSearchParams(), logger: consoleLogger }
  })

  test('keyword "rotate"', () => {
    const res = rotate({ rotate: '90' }, dirCtx)

    expect(res).toBeInstanceOf(Function)
  })

  test('missing', () => {
    const res = rotate({}, dirCtx)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid', () => {
      const throwingFn = () => rotate({ rotate: 'invalid' }, dirCtx)

      expect(throwingFn).toThrow('Invalid rotate value: "invalid", expected an angle in degrees, or "false" to disable')
    })

    test('empty', () => {
      const res = rotate({ rotate: '' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('false disables', () => {
      const res = rotate({ rotate: 'false' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('integer', () => {
      const res = rotate({ rotate: '90' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    it('rejects a fractional angle instead of truncating it', () => {
      const throwingFn = () => rotate({ rotate: '90.75' }, dirCtx)

      expect(throwingFn).toThrow('Invalid rotate value: "90.75", expected an angle in degrees, or "false" to disable')
    })
  })

  describe('transform', () => {
    let img: Sharp
    beforeEach(() => {
      img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
    })

    test('90', async () => {
      const { image } = await applyTransforms([rotate({ rotate: '90' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('180', async () => {
      const { image } = await applyTransforms([rotate({ rotate: '180' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('w/ background', async () => {
      const { image } = await applyTransforms([rotate({ rotate: '45', background: '#0f0' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })
  })
})
