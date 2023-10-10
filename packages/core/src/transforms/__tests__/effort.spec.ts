import { getEffort } from '../effort'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { describe, beforeEach, expect, test, it } from 'vitest'
import { METADATA } from '../../lib/metadata'

describe('effort', () => {
  let img: Sharp
  beforeEach(() => {
    img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
  })

  test('keyword "effort"', () => {
    const res = getEffort({ effort: '3' }, img)

    expect(res).toEqual(3)
  })

  test('missing', () => {
    const res = getEffort({}, img)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid', () => {
      const res = getEffort({ effort: 'invalid' }, img)

      expect(res).toBeUndefined()
    })

    test('empty', () => {
      const res = getEffort({ effort: '' }, img)

      expect(res).toBeUndefined()
    })

    test('integer', () => {
      const res = getEffort({ effort: '3' }, img)

      expect(res).toEqual(3)
    })

    it('rounds float to int', () => {
      const res = getEffort({ effort: '3.5' }, img)

      expect(res).toEqual(3)
    })

    it('sets to minimum effort with "min"', async () => {
      img[METADATA] = { format: 'webp' }
      const res = getEffort({ effort: 'min' }, img)

      expect(res).toEqual(0)
    })

    it('sets to maximum effort with "max"', async () => {
      img[METADATA] = { format: 'webp' }
      const res = getEffort({ effort: 'max' }, img)

      expect(res).toEqual(6)
    })

    it('ignores effort when not applicable', async () => {
      img[METADATA] = { format: 'jpeg' }
      const res = getEffort({ effort: 'max' }, img)

      expect(res).toBeUndefined()
    })
  })
})
