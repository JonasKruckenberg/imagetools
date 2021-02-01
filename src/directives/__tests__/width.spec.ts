import { buildOptions } from "../../options"
import { widthDirective } from "../width"

describe('directive "width"', () => {
    it('matches the "width" keyword', () => {
        const url = new URL('/test.jpg?width=500', 'file://')

        expect(buildOptions(url, [widthDirective]))
            .toHaveProperty('width')
    })

    test('argument must be an Integer', () => {
        const url1 = new URL('/test.jpg?width=500', 'file://')
        expect(buildOptions(url1, [widthDirective]))
            .toHaveProperty('width', 500)

        const url2 = new URL('/test.jpg?width=foo', 'file://')
        expect(buildOptions.bind(null, url2, [widthDirective]))
            .toThrow('invalid width "foo"')
    })

    test('argument gets parsed as integer', () => {
        const url1 = new URL('/test.jpg?width=500', 'file://')
        expect(buildOptions(url1, [widthDirective]))
            .toHaveProperty('width', 500)

        const url2 = new URL('/test.jpg?width=10.25', 'file://')
        expect(buildOptions(url2, [widthDirective]))
            .toHaveProperty('width', 10)
    })
})