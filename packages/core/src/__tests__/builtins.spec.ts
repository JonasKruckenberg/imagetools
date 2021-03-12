import * as builtins from '../builtins'

const expectedBuiltins = ['blur', 'flatten', 'flip', 'flop', 'format', 'grayscale', 'hsb', 'invert', 'median', 'normalize', 'resize', 'rotate', 'tint']

describe('builtins', () => {
    test('correct exports', () => {

        for (const builtin of expectedBuiltins) {
            expect(builtins).toHaveProperty(builtin)
        }
    })

    test('no extraneous exports', () => {
        for (const dir in builtins) {
            expect(expectedBuiltins).toContain(dir)
        }
    })
})