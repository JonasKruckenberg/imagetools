import { getQuality } from '../quality'
import type { ImageMetadata } from '../../types'
import { describe, expect, test, it } from 'vitest'

const state = {
  info: { width: 0, height: 0, autoOriented: { width: 0, height: 0 } },
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
      const throwingFn = () => getQuality({ quality: 'invalid' }, state)

      expect(throwingFn).toThrow(
        'Invalid quality value: "invalid", expected an integer between 0 and 100, or "false" to disable'
      )
    })

    test('out of range', () => {
      const throwingFn = () => getQuality({ quality: '150' }, state)

      expect(throwingFn).toThrow(
        'Invalid quality value: "150", expected an integer between 0 and 100, or "false" to disable'
      )
    })

    test('negative', () => {
      const throwingFn = () => getQuality({ quality: '-1' }, state)

      expect(throwingFn).toThrow(
        'Invalid quality value: "-1", expected an integer between 0 and 100, or "false" to disable'
      )
    })

    test('empty', () => {
      const res = getQuality({ quality: '' }, state)

      expect(res).toBeUndefined()
    })

    test('false disables', () => {
      const res = getQuality({ quality: 'false' }, state)

      expect(res).toBeUndefined()
    })

    test('integer', () => {
      const res = getQuality({ quality: '3' }, state)

      expect(res).toEqual(3)
    })

    test('zero is applied, not dropped', () => {
      const res = getQuality({ quality: '0' }, state)

      expect(res).toEqual(0)
    })

    it('rejects a fractional quality instead of truncating it', () => {
      const throwingFn = () => getQuality({ quality: '3.5' }, state)

      expect(throwingFn).toThrow(
        'Invalid quality value: "3.5", expected an integer between 0 and 100, or "false" to disable'
      )
    })

    it('accepts scientific notation', () => {
      const res = getQuality({ quality: '1e1' }, state)

      expect(res).toEqual(10)
    })
  })
})
