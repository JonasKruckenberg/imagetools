import { resize } from '../resize'
import sharp from 'sharp'
import { transformImage } from '../../util'
import { applyTransforms } from '../../util'
import { DirectiveContext } from '../../types'
import { toMatchFile } from 'jest-file-snapshot'
import { join } from 'path'

expect.extend({ toMatchFile })

const snapshot = (name: string) => join(__dirname, '__file_snapshots__', name)

describe('resize', () => {
    let dirCtx: DirectiveContext
    beforeEach(() => {
        dirCtx = { useParam: jest.fn, setMetadata: jest.fn }
    })

    it('returns a function if "width" is present', () => {
        const res = resize({ width: '300' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    it('returns a function if "w" is present', () => {
        const res = resize({ w: '300' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    it('returns a function if "height" is present', () => {
        const res = resize({ height: '300' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    it('returns a function if "h" is present', () => {
        const res = resize({ h: '300' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    it('returns a function if "width" and "height" are present', () => {
        const res = resize({ width: '300', height: '300' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    it('returns a function if "w" and "h" are present', () => {
        const res = resize({ w: '300', h: '300' }, dirCtx)

        expect(res).toBeInstanceOf(Function)
    })

    describe('transform',() => {
        it('width', async () => {
            const img = sharp(join(__dirname,'/__assets__/pexels-allec-gomes-5195763.jpg'))
    
            // @ts-ignore
            const out = await transformImage(img, [resize({ width: '200' }, dirCtx)]).toBuffer()
            const out = await applyTransforms(img, [resize({ width: '200' }, dirCtx)]).toBuffer()
    
            expect(out).toMatchFile(snapshot('resize-width.jpg'))
        })
    
        it('w', async () => {
            const img = sharp(join(__dirname,'/__assets__/pexels-allec-gomes-5195763.jpg'))
    
            // @ts-ignore
            const out = await transformImage(img, [resize({ w: '200' }, dirCtx)]).toBuffer()
            const out = await applyTransforms(img, [resize({ w: '200' }, dirCtx)]).toBuffer()
    
            expect(out).toMatchFile(snapshot('resize-w.jpg'))
        })
    
        it('height', async () => {
            const img = sharp(join(__dirname,'/__assets__/pexels-allec-gomes-5195763.jpg'))
    
            // @ts-ignore
            const out = await transformImage(img, [resize({ height: '200' }, dirCtx)]).toBuffer()
            const out = await applyTransforms(img, [resize({ height: '200' }, dirCtx)]).toBuffer()
    
            expect(out).toMatchFile(snapshot('resize-height.jpg'))
        })
    
        it('h', async () => {
            const img = sharp(join(__dirname,'/__assets__/pexels-allec-gomes-5195763.jpg'))
    
            // @ts-ignore
            const out = await transformImage(img, [resize({ h: '200' }, dirCtx)]).toBuffer()
            const out = await applyTransforms(img, [resize({ h: '200' }, dirCtx)]).toBuffer()
    
            expect(out).toMatchFile(snapshot('resize-h.jpg'))
        })
    
        it('width & height', async () => {
            const img = sharp(join(__dirname,'/__assets__/pexels-allec-gomes-5195763.jpg'))
    
            // @ts-ignore
            const out = await transformImage(img, [resize({ width: '200', height: '200' }, dirCtx)]).toBuffer()
            const out = await applyTransforms(img, [resize({ width: '200', height: '200' }, dirCtx)]).toBuffer()
    
            expect(out).toMatchFile(snapshot('resize-width&height.jpg'))
        })
    
        it('w & h', async () => {
            const img = sharp(join(__dirname,'/__assets__/pexels-allec-gomes-5195763.jpg'))
    
            // @ts-ignore
            const out = await transformImage(img, [resize({ w: '200', h: '200' }, dirCtx)]).toBuffer()
            const out = await applyTransforms(img, [resize({ w: '200', h: '200' }, dirCtx)]).toBuffer()
    
            expect(out).toMatchFile(snapshot('resize-w&h.jpg'))
        })
    })
})