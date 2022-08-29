import { builtins } from '../builtins'
import { describe, test, expect } from 'vitest'

const expectedBuiltins = [
  'blur',
  'flatten',
  'flip',
  'flop',
  'format',
  'grayscale',
  'hsb',
  'invert',
  'median',
  'normalize',
  'resize',
  'rotate',
  'tint'
]

describe('builtins', () => {
  test('correct exports', () => {
    for (const builtin of expectedBuiltins) {
      expect(!!builtins.some((d) => d.name === builtin)).toBeTruthy()
    }
  })
})
