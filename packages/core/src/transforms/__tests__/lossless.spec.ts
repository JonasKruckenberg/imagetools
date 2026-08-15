import { getLossless } from '../lossless'
import type { ImageMetadata } from '../../types'
import { describe, expect, test } from 'vitest'

const state = {
  info: { width: 0, height: 0, autoOriented: { width: 0, height: 0 } },
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
      //@ts-expect-error invalid lossless values are validated at runtime
      const throwingFn = () => getLossless({ lossless: 'invalid' }, state)

      expect(throwingFn).toThrow(
        'Invalid lossless value: "invalid", expected "true", "false" or a bare "lossless" directive'
      )
    })

    test('false', () => {
      const res = getLossless({ lossless: 'false' }, state)

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
