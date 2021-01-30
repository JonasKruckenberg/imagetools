import { Directive } from "./index"
import { heightDirective } from "./height"
import { widthDirective } from "./width"
import pm from 'picomatch'

export const sizeDirective: Directive = {
    name: 'size',
    test(key: string, value: string) {
        return key === 'size' && pm.isMatch(value, ['+([0-9])x+([0-9])'])
    },
    transform(_: string, value: string) {
        if (~value.indexOf('x')) {
            const [width, height] = value.split('x')
            return {
                ...widthDirective.transform('width', width),
                ...heightDirective.transform('height', height)
            }
        } else {
            return widthDirective.transform('width', value)
        }
    }
}