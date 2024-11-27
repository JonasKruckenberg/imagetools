import { hsb } from '../hsb'
import { TransformFactoryContext } from '../../types'
import { applyTransforms } from '../../index'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import { describe, beforeEach, beforeAll, vi, expect, test } from 'vitest'
import { consoleLogger } from '../../lib/logger'

expect.extend({ toMatchImageSnapshot })

describe('hue', () => {
  let dirCtx: TransformFactoryContext
  beforeAll(() => {
    dirCtx = { useParam: vi.fn, manualSearchParams: new URLSearchParams(), logger: consoleLogger }
  })

  test('keyword "hue"', () => {
    const res = hsb({ hue: '90' }, dirCtx)

    expect(res).toBeInstanceOf(Function)
  })

  test('missing', () => {
    const res = hsb({}, dirCtx)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid', () => {
      const res = hsb({ hue: 'invalid' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('empty', () => {
      const res = hsb({ hue: '' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('integer', () => {
      const res = hsb({ hue: '90' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    test('float', () => {
      const res = hsb({ hue: '4.3' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    test('negative integer', () => {
      const res = hsb({ hue: '-90' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    test('negative float', () => {
      const res = hsb({ hue: '-4.3' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })
  })

  describe('transform', () => {
    let img: Sharp
    beforeEach(() => {
      img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
    })

    test('45', async () => {
      const { image } = await applyTransforms([hsb({ hue: '45' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('90', async () => {
      const { image } = await applyTransforms([hsb({ hue: '90' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('negative 90', async () => {
      const { image } = await applyTransforms([hsb({ hue: '-90' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('180', async () => {
      const { image } = await applyTransforms([hsb({ hue: '180' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })
  })
})

describe('saturation', () => {
  let dirCtx: TransformFactoryContext
  beforeAll(() => {
    dirCtx = { useParam: vi.fn, manualSearchParams: new URLSearchParams(), logger: consoleLogger }
  })

  test('keyword "saturation"', () => {
    const res = hsb({ saturation: '1' }, dirCtx)

    expect(res).toBeInstanceOf(Function)
  })

  test('missing', () => {
    const res = hsb({}, dirCtx)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid', () => {
      const res = hsb({ saturation: 'invalid' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('empty', () => {
      const res = hsb({ saturation: '' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('integer', () => {
      const res = hsb({ saturation: '1' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    test('float', () => {
      const res = hsb({ saturation: '0.75' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })
  })

  describe('transform', () => {
    let img: Sharp
    beforeEach(() => {
      img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
    })

    test('0.5', async () => {
      const { image } = await applyTransforms([hsb({ saturation: '0.5' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('1', async () => {
      const { image } = await applyTransforms([hsb({ saturation: '1' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('1.5', async () => {
      const { image } = await applyTransforms([hsb({ saturation: '1.5' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })
  })
})

describe('brightness', () => {
  let dirCtx: TransformFactoryContext
  beforeAll(() => {
    dirCtx = { useParam: vi.fn, manualSearchParams: new URLSearchParams(), logger: consoleLogger }
  })

  test('keyword "brightness"', () => {
    const res = hsb({ brightness: '1' }, dirCtx)

    expect(res).toBeInstanceOf(Function)
  })

  test('missing', () => {
    const res = hsb({}, dirCtx)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid', () => {
      const res = hsb({ brightness: 'invalid' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('empty', () => {
      const res = hsb({ brightness: '' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('integer', () => {
      const res = hsb({ brightness: '1' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    test('float', () => {
      const res = hsb({ brightness: '0.75' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })
  })

  describe('transform', () => {
    let img: Sharp
    beforeEach(() => {
      img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
    })

    test('0.5', async () => {
      const { image } = await applyTransforms([hsb({ brightness: '0.5' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('1', async () => {
      const { image } = await applyTransforms([hsb({ brightness: '1' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('1.5', async () => {
      const { image } = await applyTransforms([hsb({ brightness: '1.5' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })
  })
})
