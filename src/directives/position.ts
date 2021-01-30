import { Directive } from "./index"
import pm from 'picomatch'

export const positionDirective: Directive = {
    name: 'position',
    test(key: string, value: string) {
        if (key === 'position') return true

        return pm.isMatch(key, ['top', 'right top', 'right', 'right bottom', 'bottom', 'left bottom', 'left', 'left top', 'north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest', 'center', 'centre', 'entropy', 'attention']) && value === ''
    },
    transform(key: string, value: string) {
        return { position: !!value ? value : key }
    }
}