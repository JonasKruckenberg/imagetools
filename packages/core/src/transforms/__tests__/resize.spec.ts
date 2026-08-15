import { toMatchImageSnapshot } from 'jest-image-snapshot'
import { join } from 'path'
import sharp, { type Sharp } from 'sharp'
import { afterAll, beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'

import { applyTransforms } from '../../index'
import { TransformFactoryContext } from '../../types'
import { resize } from '../resize'
import { consoleLogger } from '../../lib/logger'

expect.extend({ toMatchImageSnapshot })

let dirCtx: TransformFactoryContext
beforeAll(() => {
  dirCtx = { useParam: vi.fn(), manualSearchParams: new URLSearchParams(), logger: consoleLogger }
  vi.spyOn(dirCtx.logger, 'info')
})
beforeEach(() => {
  vi.resetAllMocks()
})
afterAll(() => {
  vi.restoreAllMocks()
})

describe('width', () => {
  test('keyword "w"', () => {
    const res = resize({ w: '300' }, dirCtx)

    expect(res).toBeInstanceOf(Function)
  })

  test('missing', () => {
    const res = resize({}, dirCtx)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid', () => {
      const throwingFn = () => resize({ w: 'invalid' }, dirCtx)

      expect(throwingFn).toThrow(
        'Invalid w value: "invalid", expected a positive width in pixels, or "false" to disable'
      )
    })

    test('non-positive', () => {
      const throwingFn = () => resize({ w: '-100' }, dirCtx)

      expect(throwingFn).toThrow('Invalid w value: "-100", expected a positive width in pixels, or "false" to disable')
    })

    test('zero', () => {
      const throwingFn = () => resize({ w: '0' }, dirCtx)

      expect(throwingFn).toThrow('Invalid w value: "0", expected a positive width in pixels, or "false" to disable')
    })

    test('empty', () => {
      const res = resize({ w: '' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('false disables', () => {
      const res = resize({ w: 'false' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('integer', () => {
      const res = resize({ w: '300' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    test('rejects a fractional width instead of truncating it', () => {
      const throwingFn = () => resize({ w: '300.75' }, dirCtx)

      expect(throwingFn).toThrow(
        'Invalid w value: "300.75", expected a positive width in pixels, or "false" to disable'
      )
    })
  })

  describe('transform', () => {
    let img: Sharp
    beforeEach(() => {
      img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
    })

    test('100', async () => {
      //@ts-expect-error we know this is safe
      const { image } = await applyTransforms([resize({ w: '100' }, dirCtx)], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('400', async () => {
      //@ts-expect-error we know this is safe
      const { image } = await applyTransforms([resize({ w: '400' }, dirCtx)], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })
  })
})

describe('height', () => {
  test('keyword "h"', () => {
    const res = resize({ h: '300' }, dirCtx)

    expect(res).toBeInstanceOf(Function)
  })

  test('missing', () => {
    const res = resize({}, dirCtx)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid', () => {
      const throwingFn = () => resize({ h: 'invalid' }, dirCtx)

      expect(throwingFn).toThrow(
        'Invalid h value: "invalid", expected a positive height in pixels, or "false" to disable'
      )
    })

    test('non-positive', () => {
      const throwingFn = () => resize({ h: '-100' }, dirCtx)

      expect(throwingFn).toThrow('Invalid h value: "-100", expected a positive height in pixels, or "false" to disable')
    })

    test('zero', () => {
      const throwingFn = () => resize({ h: '0' }, dirCtx)

      expect(throwingFn).toThrow('Invalid h value: "0", expected a positive height in pixels, or "false" to disable')
    })

    test('empty', () => {
      const res = resize({ h: '' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('false disables', () => {
      const res = resize({ h: 'false' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('integer', () => {
      const res = resize({ h: '300' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    test('rejects a fractional height instead of truncating it', () => {
      const throwingFn = () => resize({ h: '300.75' }, dirCtx)

      expect(throwingFn).toThrow(
        'Invalid h value: "300.75", expected a positive height in pixels, or "false" to disable'
      )
    })
  })

  describe('transform', () => {
    let img: Sharp
    beforeEach(() => {
      img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
    })

    test('100', async () => {
      //@ts-expect-error we know this is safe
      const { image } = await applyTransforms([resize({ h: '100' }, dirCtx)], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('400', async () => {
      //@ts-expect-error we know this is safe
      const { image } = await applyTransforms([resize({ h: '400' }, dirCtx)], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })
  })
})

describe('width & height', () => {
  test('keywords "w" & "h"', () => {
    const res = resize({ w: '300', h: '300' }, dirCtx)

    expect(res).toBeInstanceOf(Function)
  })

  describe('transform', () => {
    let img: Sharp
    beforeEach(() => {
      img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
    })

    test('basic', async () => {
      //@ts-expect-error we know this is safe
      const { image } = await applyTransforms([resize({ w: '300', h: '300' }, dirCtx)], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('w/ fit', async () => {
      //@ts-expect-error we know this is safe
      const { image } = await applyTransforms([resize({ w: '300', h: '300', fit: 'contain' }, dirCtx)], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('w/ fit & background', async () => {
      const { image } = await applyTransforms(
        //@ts-expect-error we know this is safe
        [resize({ w: '300', h: '300', fit: 'contain', background: '#0f0' }, dirCtx)],
        img
      )

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('w/ fit and position', async () => {
      const { image } = await applyTransforms(
        //@ts-expect-error we know this is safe
        [resize({ w: '300', h: '300', fit: 'cover', position: 'top' }, dirCtx)],
        img
      )

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('w/ kernel', async () => {
      //@ts-expect-error we know this is safe
      const { image } = await applyTransforms([resize({ w: '300', h: '300', kernel: 'cubic' }, dirCtx)], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })
  })
})

describe('aspect', () => {
  test('keyword "aspect"', () => {
    const res = resize({ aspect: '16:9' }, dirCtx)

    expect(res).toBeInstanceOf(Function)
  })

  test('missing', () => {
    const res = resize({}, dirCtx)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid aspect', () => {
      const throwingFn = () => resize({ aspect: 'invalid' }, dirCtx)

      expect(throwingFn).toThrow(
        'Invalid aspect value: "invalid", expected a ratio such as "16:9" or a positive number, or "false" to disable'
      )
    })

    test('invalid ar', () => {
      const res = resize({ ar: 'invalid' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('undefined', () => {
      const res = resize({ ar: undefined }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('empty', () => {
      const res = resize({ aspect: '' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('false disables', () => {
      const res = resize({ aspect: 'false' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('integer', () => {
      const res = resize({ aspect: '1' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    test('float', () => {
      const res = resize({ aspect: '1.5' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    test('negative number', () => {
      const throwingFn = () => resize({ aspect: '-1.5' }, dirCtx)

      expect(throwingFn).toThrow(
        'Invalid aspect value: "-1.5", expected a ratio such as "16:9" or a positive number, or "false" to disable'
      )
    })

    test('string', () => {
      const res = resize({ aspect: '16:9' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })
  })

  describe('transform', () => {
    let img: Sharp
    beforeEach(() => {
      img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
    })

    test('basic w/ string', async () => {
      //@ts-expect-error we know this is safe
      const { image } = await applyTransforms([resize({ aspect: '4:3' }, dirCtx)], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('basic w/ number', async () => {
      //@ts-expect-error we know this is safe
      const { image } = await applyTransforms([resize({ aspect: '1.5' }, dirCtx)], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('w/ crop horizontally', async () => {
      // @ts-expect-error we know this is safe
      const { image } = await applyTransforms([resize({ aspect: '1:2' }, dirCtx)], img)

      const { width = 0, height = 0 } = await sharp(await image.toBuffer()).metadata()
      expect(width / height).toEqual(1 / 2)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('w/ fit', async () => {
      //@ts-expect-error we know this is safe
      const { image } = await applyTransforms([resize({ aspect: '4:3', fit: 'contain' }, dirCtx)], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('w/ fit & background', async () => {
      const { image } = await applyTransforms(
        //@ts-expect-error we know this is safe
        [resize({ aspect: '4:3', fit: 'contain', background: '#0f0' }, dirCtx)],
        img
      )

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('w/ fit and position', async () => {
      const { image } = await applyTransforms(
        //@ts-expect-error we know this is safe
        [resize({ aspect: '4:3', fit: 'cover', position: 'top' }, dirCtx)],
        img
      )

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('w/ kernel', async () => {
      //@ts-expect-error we know this is safe
      const { image } = await applyTransforms([resize({ aspect: '4:3', kernel: 'cubic' }, dirCtx)], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('w/ height', async () => {
      //@ts-expect-error we know this is safe
      const { image } = await applyTransforms([resize({ aspect: '4:3', h: '75' }, dirCtx)], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('w/ width', async () => {
      //@ts-expect-error we know this is safe
      const { image } = await applyTransforms([resize({ aspect: '4:3', w: '300' }, dirCtx)], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('w/ width & height', async () => {
      const { image } = await applyTransforms(
        //@ts-expect-error we know this is safe
        [resize({ aspect: '4:3', h: '300', w: '300' }, dirCtx)],
        img
      )

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('records the requested aspect ratio', async () => {
      const { metadata } = await applyTransforms(
        //@ts-expect-error we know this is safe
        [resize({ aspect: '4:3', allowUpscale: 'true' }, dirCtx)],
        img
      )

      expect(metadata.transforms.aspect).toBeCloseTo(4 / 3, 5)
      expect(metadata.transforms.allowUpscale).toBe(true)
    })

    test('records the resolved aspect ratio when both dimensions are given', async () => {
      const { metadata } = await applyTransforms(
        //@ts-expect-error we know this is safe
        [resize({ w: '600', h: '600', fit: 'cover' }, dirCtx)],
        img
      )

      expect(metadata.transforms.aspect).toBeCloseTo(1, 5)
    })
  })
})

describe('allowUpscale', () => {
  test('keyword "allowUpscale" w/ dimension', () => {
    const res = resize({ allowUpscale: 'true', w: '300' }, dirCtx)

    expect(res).toBeInstanceOf(Function)
  })

  test('missing', () => {
    const res = resize({}, dirCtx)

    expect(res).toBeUndefined()
  })

  test('true w/ missing dimension', () => {
    const res = resize({ allowUpscale: 'true' }, dirCtx)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid allowUpscale', () => {
      //@ts-expect-error invalid allowUpscale values are validated at runtime
      const throwingFn = () => resize({ allowUpscale: 'invalid', w: '300' }, dirCtx)

      expect(throwingFn).toThrow(
        'Invalid allowUpscale value: "invalid", expected "true", "false" or a bare "allowUpscale" directive'
      )
    })

    test('false', () => {
      const res = resize({ allowUpscale: 'false', w: '300' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    test('empty', () => {
      const res = resize({ allowUpscale: '', w: '300' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    test('true', () => {
      const res = resize({ allowUpscale: 'true', w: '300' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })
  })

  describe('transform', () => {
    let img: Sharp
    beforeEach(() => {
      img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
    })

    test('rejects multiple dimensions as a single value', async () => {
      // multi-value directives are split into separate configs by resolveConfigs,
      // so the transform itself must reject them
      const throwingFn = () => resize({ allowUpscale: 'true', w: '300;900' }, dirCtx)

      expect(throwingFn).toThrow(
        'Invalid w value: "300;900", expected a positive width in pixels, or "false" to disable'
      )
    })

    test('w/ width', async () => {
      //@ts-expect-error we know this is safe
      const { image } = await applyTransforms([resize({ allowUpscale: 'true', w: '300' }, dirCtx)], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('rejects multiple heights as a single value', async () => {
      const throwingFn = () => resize({ allowUpscale: 'true', h: '300;900' }, dirCtx)

      expect(throwingFn).toThrow(
        'Invalid h value: "300;900", expected a positive height in pixels, or "false" to disable'
      )
    })

    test('w/ aspect', async () => {
      const { image } = await applyTransforms(
        //@ts-expect-error we know this is safe
        [resize({ allowUpscale: 'true', aspect: '4:3' }, dirCtx)],
        img
      )

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('w/ width & height', async () => {
      const { image } = await applyTransforms(
        //@ts-expect-error we know this is safe
        [resize({ allowUpscale: 'true', h: '300', w: '300' }, dirCtx)],
        img
      )

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('w/ width & height & aspect', async () => {
      const { image } = await applyTransforms(
        //@ts-expect-error we know this is safe
        [resize({ allowUpscale: 'true', aspect: '4:3', h: '300', w: '300' }, dirCtx)],
        img
      )

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })
  })
})
