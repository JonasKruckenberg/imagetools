import * as directives from '../'

describe('directives',() => {
    it('exports "background"',() => {
        expect('background' in directives).toBeTruthy()
    })
    it('exports "blur"',() => {
        expect('blur' in directives).toBeTruthy()
    })
    it('exports "fit"',() => {
        expect('fit' in directives).toBeTruthy()
    })
    it('exports "flip"',() => {
        expect('flip' in directives).toBeTruthy()
    })
    it('exports "flop"',() => {
        expect('flop' in directives).toBeTruthy()
    })
    it('exports "flatten"',() => {
        expect('flatten' in directives).toBeTruthy()
    })
    it('exports "format"',() => {
        expect('format' in directives).toBeTruthy()
    })
    it('exports "grayscale"',() => {
        expect('grayscale' in directives).toBeTruthy()
    })
    it('exports "invert"',() => {
        expect('invert' in directives).toBeTruthy()
    })
    it('exports "kernel"',() => {
        expect('kernel' in directives).toBeTruthy()
    })
    it('exports "median"',() => {
        expect('median' in directives).toBeTruthy()
    })
    it('exports "normalize"',() => {
        expect('normalize' in directives).toBeTruthy()
    })
    it('exports "position"',() => {
        expect('position' in directives).toBeTruthy()
    })
    it('exports "quality"',() => {
        expect('quality' in directives).toBeTruthy()
    })
    it('exports "resize"',() => {
        expect('resize' in directives).toBeTruthy()
    })
    it('exports "rotate"',() => {
        expect('rotate' in directives).toBeTruthy()
    })
    it('exports "tint"',() => {
        expect('tint' in directives).toBeTruthy()
    })
    it('exports "hsb"',() => {
        expect('hsb' in directives).toBeTruthy()
    })
})