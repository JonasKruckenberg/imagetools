import { buildOptions } from '../../options'
import { fitDirective } from '../fit'
import { widthDirective } from '../width'

describe('directive: "fit"', () => {
    describe('w/ argument: "cover"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?width=300&fit=cover', 'file://')
            expect(buildOptions(url, [fitDirective, widthDirective]))
                .toHaveProperty('fit', 'cover')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?width=300&cover', 'file://')
            expect(buildOptions(url, [fitDirective, widthDirective]))
                .toHaveProperty('fit', 'cover')
        })
    })
    describe('w/ argument: "contain"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?width=300&fit=contain', 'file://')
            expect(buildOptions(url, [fitDirective, widthDirective]))
                .toHaveProperty('fit', 'contain')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?width=300&contain', 'file://')
            expect(buildOptions(url, [fitDirective, widthDirective]))
                .toHaveProperty('fit', 'contain')
        })
    })
    describe('w/ argument: "fill"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?width=300&fit=fill', 'file://')
            expect(buildOptions(url, [fitDirective, widthDirective]))
                .toHaveProperty('fit', 'fill')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?width=300&fill', 'file://')
            expect(buildOptions(url, [fitDirective, widthDirective]))
                .toHaveProperty('fit', 'fill')
        })
    })
    describe('w/ argument: "inside"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?width=300&fit=inside', 'file://')
            expect(buildOptions(url, [fitDirective, widthDirective]))
                .toHaveProperty('fit', 'inside')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?width=300&inside', 'file://')
            expect(buildOptions(url, [fitDirective, widthDirective]))
                .toHaveProperty('fit', 'inside')
        })
    })
    describe('w/ argument: "outside"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?width=300&fit=outside', 'file://')
            expect(buildOptions(url, [fitDirective, widthDirective]))
                .toHaveProperty('fit', 'outside')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?width=300&outside', 'file://')
            expect(buildOptions(url, [fitDirective, widthDirective]))
                .toHaveProperty('fit', 'outside')
        })
    })
})