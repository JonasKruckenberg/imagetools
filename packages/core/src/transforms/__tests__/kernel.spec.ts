import { getKernel, KernelValue } from '../kernel'
import type { ImageMetadata } from '../../types'
import { describe, expect, test } from 'vitest'

const state = {
  info: { width: 0, height: 0, autoOriented: { width: 0, height: 0 } },
  transforms: {}
} as ImageMetadata

describe('kernel', () => {
  test('keyword "kernel"', () => {
    const res = getKernel({ kernel: 'cubic' }, state)

    expect(res).toEqual('cubic')
  })

  test('missing', () => {
    const res = getKernel({}, state)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid', () => {
      //@ts-expect-error invalid kernel values are validated at runtime
      const throwingFn = () => getKernel({ kernel: 'invalid' }, state)

      expect(throwingFn).toThrow(
        'Invalid kernel value: "invalid", expected one of "nearest", "cubic", "mitchell", "lanczos2" or "lanczos3", or "false" to disable'
      )
    })

    test('empty', () => {
      const res = getKernel({ kernel: '' }, state)

      expect(res).toBeUndefined()
    })

    test('false disables', () => {
      const res = getKernel({ kernel: 'false' }, state)

      expect(res).toBeUndefined()
    })

    test('valid', () => {
      const args: KernelValue[] = ['nearest', 'cubic', 'mitchell', 'lanczos2', 'lanczos3']

      for (const arg of args) {
        const res = getKernel({ kernel: arg }, state)

        expect(res).toEqual(arg)
      }
    })
  })
})
