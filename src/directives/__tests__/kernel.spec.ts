import { buildOptions } from "../../options"
import { kernelDirective } from "../kernel"
import { widthDirective } from "../width"

describe('directive: "kernel"', () => {
    describe('argument: "nearest"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?width=300&kernel=nearest', 'file://')

            expect(buildOptions(url, [kernelDirective, widthDirective]))
                .toHaveProperty('kernel', 'nearest')
        })
        it('cannot be used as shorthand', () => {
            const url = new URL('/test.jpg?width=300&nearest', 'file://')

            expect(buildOptions.bind(null, url, [kernelDirective, widthDirective]))
                .toThrow('unknown directive "nearest"')
        })
    })
    describe('argument: "cubic"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?width=300&kernel=cubic', 'file://')

            expect(buildOptions(url, [kernelDirective, widthDirective]))
                .toHaveProperty('kernel', 'cubic')
        })
        it('cannot be used as shorthand', () => {
            const url = new URL('/test.jpg?width=300&cubic', 'file://')

            expect(buildOptions.bind(null, url, [kernelDirective, widthDirective]))
                .toThrow('unknown directive "cubic"')
        })
    })
    describe('argument: "mitchell"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?width=300&kernel=mitchell', 'file://')

            expect(buildOptions(url, [kernelDirective, widthDirective]))
                .toHaveProperty('kernel', 'mitchell')
        })
        it('cannot be used as shorthand', () => {
            const url = new URL('/test.jpg?width=300&mitchell', 'file://')

            expect(buildOptions.bind(null, url, [kernelDirective, widthDirective]))
                .toThrow('unknown directive "mitchell"')
        })
    })
    describe('argument: "lanczos2"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?width=300&kernel=lanczos2', 'file://')

            expect(buildOptions(url, [kernelDirective, widthDirective]))
                .toHaveProperty('kernel', 'lanczos2')
        })
        it('cannot be used as shorthand', () => {
            const url = new URL('/test.jpg?width=300&lanczos2', 'file://')

            expect(buildOptions.bind(null, url, [kernelDirective, widthDirective]))
                .toThrow('unknown directive "lanczos2"')
        })
    })
    describe('argument: "lanczos3"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?width=300&kernel=lanczos3', 'file://')
            expect(buildOptions(url, [kernelDirective, widthDirective]))
                .toHaveProperty('kernel', 'lanczos3')
        })
        it('cannot be used as shorthand', () => {
            const url = new URL('/test.jpg?width=300&lanczos3', 'file://')
            expect(buildOptions.bind(null, url, [kernelDirective, widthDirective]))
                .toThrow('unknown directive "lanczos3"')
        })
    })
})