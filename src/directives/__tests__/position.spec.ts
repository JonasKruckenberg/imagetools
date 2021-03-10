import { position, PositionValue } from '../position'

describe('position', () => {
    it('marks "position" as used', () => {
        const usedParams = new Set()
        position({ position: 'center' }, { useParam: k => usedParams.add(k), setMetadata: jest.fn })

        expect(usedParams.has('position')).toBeTruthy()
    })

    /**
     * Reenable this test once position shorthands are enabled 
     */
    // it('marks the shorthands as used', () => {
    //     const positions: PositionValue[] = ['top', 'right top', 'right', 'right bottom', 'bottom', 'left bottom', 'left', 'left top',
    //     'north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest', 'center', 'centre',
    //     'cover', 'entropy', 'attention']

    //     for (const f of positions) {
    //         const usedParams = new Set()
    //         position({ [f]: '' }, { useParam: k => usedParams.add(k), setMetadata: jest.fn })

    //         expect(usedParams.has(f)).toBeTruthy()
    //     }
    // })

    it('add "position" to the output metadata', () => {
        const metadata = new Map()

        position({ position: 'bottom' }, { useParam: jest.fn, setMetadata: (k, v) => metadata.set(k, v) })

        expect(metadata.has('position')).toBeTruthy()
        expect(metadata.get('position')).toEqual('bottom')
    })

    it('returns null if the arg is not a valid position', () => {
        //@ts-expect-error
        const res = position({ position: 'whatta' }, { useParam: jest.fn, setMetadata: jest.fn })

        expect(res).toBeNull()
    })

    it('returns null if "position" is missing', () => {
        const res = position({}, { useParam: jest.fn, setMetadata: jest.fn })
        expect(res).toBeNull()
    })
})