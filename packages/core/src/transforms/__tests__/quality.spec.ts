import { getQuality } from '../quality'
import type { ImageMetadata } from '../../types'
import { describe, expect, test, it } from 'vitest'

const state = {
  info: { width: 0, height: 0, autoOrient: { width: 0, height: 0 } },
  transforms: {}
} as ImageMetadata

describe('quality', () => {
  test('keyword "quality"', () => {
    const res = getQuality({ quality: '3' }, state)

    expect(res).toEqual(3)
  })

  test('missing', () => {
    const res = getQuality({}, state)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid', () => {
      const res = getQuality({ quality: 'invalid' }, state)

      expect(res).toBeUndefined()
    })

    test('empty', () => {
      const res = getQuality({ quality: '' }, state)

      expect(res).toBeUndefined()
    })

    test('integer', () => {
      const res = getQuality({ quality: '3' }, state)

      expect(res).toEqual(3)
    })

    it('rounds float to int', () => {
      const res = getQuality({ quality: '3.5' }, state)

      expect(res).toEqual(3)
    })
  })
})
