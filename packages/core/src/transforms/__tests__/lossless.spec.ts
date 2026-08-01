import { getLossless } from '../lossless'
import type { ImageMetadata } from '../../types'
import { describe, expect, test } from 'vitest'

const state = {
  info: { width: 0, height: 0, autoOrient: { width: 0, height: 0 } },
  transforms: {}
} as ImageMetadata

describe('lossless', () => {
  test('keyword "lossless"', () => {
    const res = getLossless({ lossless: 'true' }, state)

    expect(res).toEqual(true)
  })

  test('missing', () => {
    const res = getLossless({}, state)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid', () => {
      //@ts-expect-error invalid args
      const res = getLossless({ lossless: 'invalid' }, state)

      expect(res).toBeUndefined()
    })

    test('empty', () => {
      const res = getLossless({ lossless: '' }, state)

      expect(res).toEqual(true)
    })

    test('true', () => {
      const res = getLossless({ lossless: 'true' }, state)

      expect(res).toEqual(true)
    })
  })
})
