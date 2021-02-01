import { buildOptions } from '../../options'
import { formatDirective } from '../format'

describe('describe: "format"', () => {
    describe('w/ argument: "jpeg"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?format=jpeg', 'file://')
            expect(buildOptions(url, [formatDirective]))
                .toHaveProperty('format', 'jpeg')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?jpeg', 'file://')
            expect(buildOptions(url, [formatDirective]))
                .toHaveProperty('format', 'jpeg')
        })
    })
    describe('w/ argument: "jpg"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?format=jpg', 'file://')
            expect(buildOptions(url, [formatDirective]))
                .toHaveProperty('format', 'jpg')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?jpg', 'file://')
            expect(buildOptions(url, [formatDirective]))
                .toHaveProperty('format', 'jpg')
        })
    })
    describe('w/ argument: "webp"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?format=webp', 'file://')
            expect(buildOptions(url, [formatDirective]))
                .toHaveProperty('format', 'webp')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?webp', 'file://')
            expect(buildOptions(url, [formatDirective]))
                .toHaveProperty('format', 'webp')
        })
    })
    describe('w/ argument: "avif"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?format=avif', 'file://')
            expect(buildOptions(url, [formatDirective]))
                .toHaveProperty('format', 'avif')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?avif', 'file://')
            expect(buildOptions(url, [formatDirective]))
                .toHaveProperty('format', 'avif')
        })
    })
    describe('w/ argument: "png"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?format=png', 'file://')
            expect(buildOptions(url, [formatDirective]))
                .toHaveProperty('format', 'png')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?png', 'file://')
            expect(buildOptions(url, [formatDirective]))
                .toHaveProperty('format', 'png')
        })
    })
    describe('w/ argument: "gif"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?format=gif', 'file://')
            expect(buildOptions(url, [formatDirective]))
                .toHaveProperty('format', 'gif')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?gif', 'file://')
            expect(buildOptions(url, [formatDirective]))
                .toHaveProperty('format', 'gif')
        })
    })
    describe('w/ argument: "tiff"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?format=tiff', 'file://')
            expect(buildOptions(url, [formatDirective]))
                .toHaveProperty('format', 'tiff')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?tiff', 'file://')
            expect(buildOptions(url, [formatDirective]))
                .toHaveProperty('format', 'tiff')
        })
    })
    describe('w/ argument: "heif"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?format=heif', 'file://')
            expect(buildOptions(url, [formatDirective]))
                .toHaveProperty('format', 'heif')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?heif', 'file://')
            expect(buildOptions(url, [formatDirective]))
                .toHaveProperty('format', 'heif')
        })
    })
})