import { getEffort } from '../effort'
import type { ImageMetadata } from '../../types'
import { describe, expect, test, it } from 'vitest'

const state = (format: string) =>
  ({
    info: { width: 0, height: 0, autoOriented: { width: 0, height: 0 } },
    transforms: { format }
  }) as ImageMetadata

describe('effort', () => {
  test('keyword "effort"', () => {
    const res = getEffort({ effort: '3' }, state('webp'))

    expect(res).toEqual(3)
  })

  test('missing', () => {
    const res = getEffort({}, state('webp'))

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid', () => {
      const throwingFn = () => getEffort({ effort: 'invalid' }, state('webp'))

      expect(throwingFn).toThrow(
        'Invalid effort value: "invalid", expected "min", "max" or an integer, or "false" to disable'
      )
    })

    test('empty', () => {
      const res = getEffort({ effort: '' }, state('webp'))

      expect(res).toBeUndefined()
    })

    test('false disables', () => {
      const res = getEffort({ effort: 'false' }, state('webp'))

      expect(res).toBeUndefined()
    })

    test('integer', () => {
      const res = getEffort({ effort: '3' }, state('webp'))

      expect(res).toEqual(3)
    })

    it('rejects a float instead of truncating it', () => {
      const throwingFn = () => getEffort({ effort: '3.5' }, state('webp'))

      expect(throwingFn).toThrow(
        'Invalid effort value: "3.5", expected "min", "max" or an integer, or "false" to disable'
      )
    })

    it('sets to minimum effort with "min"', () => {
      const res = getEffort({ effort: 'min' }, state('webp'))

      expect(res).toEqual(0)
    })

    it('sets to maximum effort with "max"', () => {
      const res = getEffort({ effort: 'max' }, state('webp'))

      expect(res).toEqual(6)
    })

    it('ignores effort when not applicable', () => {
      const res = getEffort({ effort: 'max' }, state('jpeg'))

      expect(res).toBeUndefined()
    })

    it('uses the format recorded on state over a conflicting format directive', () => {
      const res = getEffort({ effort: 'max', format: 'webp' }, state('avif'))

      expect(res).toEqual(9)
    })
  })
})
