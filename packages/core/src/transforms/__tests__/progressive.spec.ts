import sharp, { Sharp } from 'sharp'
import { getProgressive } from '../progressive'
import { join } from 'path'
import { describe, beforeEach, expect, test } from 'vitest'
import { METADATA } from '../../lib/metadata'

describe('progressive', () => {
  let img: Sharp
  beforeEach(() => {
    img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
    img[METADATA] = { chromaSubsampling: '' }
  })

  test('keyword "progressive"', () => {
    const res = getProgressive({ progressive: 'true' }, img)

    expect(res).toEqual(true)
  })

  test('missing', () => {
    const res = getProgressive({}, img)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid', () => {
      //@ts-expect-error invalid args
      const res = getProgressive({ progressive: 'invalid' }, img)

      expect(res).toBeUndefined()
    })

    test('empty', () => {
      const res = getProgressive({ progressive: '' }, img)

      expect(res).toEqual(true)
    })

    test('true', () => {
      const res = getProgressive({ progressive: 'true' }, img)

      expect(res).toEqual(true)
    })
  })
})
