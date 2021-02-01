import { buildOptions } from "../../options"
import { sizeDirective } from "../size"

describe('directive "size"', () => {
    it('accepts two integers', () => {
        const url = new URL('/test.jpg?size=200x300', 'file://')
        expect(buildOptions.bind(null, url, [sizeDirective]))
            .not.toThrow()
    })
    it('sets width & height', () => {
        const url = new URL('/test.jpg?size=200x300', 'file://')
        const opts = buildOptions(url, [sizeDirective])
        expect(opts).toHaveProperty('width', 200)
        expect(opts).toHaveProperty('height', 300)
    })
})