import { Directive } from "./index"
import pm from 'picomatch'

export const positionDirective: Directive = {
    name: 'position',
    with: ['width', 'height', 'size', 'fit'],

    test(key: string, value: string) {
        const isKeyword = pm([
            'top',
            'right top',
            'right',
            'right bottom',
            'bottom',
            'left bottom',
            'left',
            'left top',
            'north',
            'northeast',
            'east',
            'southeast',
            'south',
            'southwest',
            'west',
            'northwest',
            'center',
            'entropy',
            'attention'
        ])
        return (key === 'position' && isKeyword(value))
            || (isKeyword(key) && value === '')
    },
    transform(key: string, value: string) {
        return { position: !!value ? value : key }
    }
}