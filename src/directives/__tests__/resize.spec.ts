import {resize} from '../resize'

describe('resize', () => {
    it('returns a function if "width" is present', () => {
        const res = resize({ width: '300' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeInstanceOf(Function)
    })
    it('returns a function if "w" is present', () => {
        const res = resize({ w: '300' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeInstanceOf(Function)
    })
    it('returns a function if "height" is present', () => {
        const res = resize({ height: '300' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeInstanceOf(Function)
    })
    it('returns a function if "h" is present', () => {
        const res = resize({ h: '300' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeInstanceOf(Function)
    })
    it('returns a function if "width" and "height" are present', () => {
        const res = resize({ width: '300', height: '300' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeInstanceOf(Function)
    })
    it('returns a function if "w" and "h" are present', () => {
        const res = resize({ w: '300', h: '300' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeInstanceOf(Function)
    })
})