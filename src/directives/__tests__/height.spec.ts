import { buildOptions } from "../../options"
import { heightDirective } from "../height"

describe('directive "height"', () => {
    it('matches the "height" keyword', () => {
        const url = new URL('/test.jpg?height=500', 'file://')
        expect(buildOptions(url, [heightDirective]))
            .toHaveProperty('height')
    })
    test('argument must be an Integer', () => {
        const url1 = new URL('/test.jpg?height=500', 'file://')
        expect(buildOptions(url1, [heightDirective]))
            .toHaveProperty('height', 500)

        const url2 = new URL('/test.jpg?height=foo', 'file://')
        expect(buildOptions.bind(null, url2, [heightDirective]))
            .toThrow('invalid height "foo"')
    })
    test('argument gets parsed as integer', () => {
        const url1 = new URL('/test.jpg?height=500', 'file://')
        expect(buildOptions(url1, [heightDirective]))
            .toHaveProperty('height', 500)

        const url2 = new URL('/test.jpg?height=10.25', 'file://')
        expect(buildOptions(url2, [heightDirective]))
            .toHaveProperty('height', 10)
    })
})