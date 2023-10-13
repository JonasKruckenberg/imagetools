import sharp, { Sharp } from 'sharp'
import { getLossless } from '../lossless'
import { join } from 'path'
import { describe, beforeEach, expect, test } from 'vitest'
import { METADATA } from '../../lib/metadata'

describe('lossless', () => {
  let img: Sharp
  beforeEach(() => {
    img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
    img[METADATA] = { chromaSubsampling: '' }
  })

  test('keyword "lossless"', () => {
    const res = getLossless({ lossless: 'true' }, img)

    expect(res).toEqual(true)
  })

  test('missing', () => {
    const res = getLossless({}, img)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid', () => {
      //@ts-expect-error invalid args
      const res = getLossless({ lossless: 'invalid' }, img)

      expect(res).toBeUndefined()
    })

    test('empty', () => {
      const res = getLossless({ lossless: '' }, img)

      expect(res).toEqual(true)
    })

    test('true', () => {
      const res = getLossless({ lossless: 'true' }, img)

      expect(res).toEqual(true)
    })
  })
})
