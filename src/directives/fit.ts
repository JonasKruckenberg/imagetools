import { Directive } from "./index"
import pm from 'picomatch'

export const fitDirective: Directive = {
    name: 'fit',
    with: ['width', 'height', 'size'],

    test(key: string, value: string) {
        const isKeyword = pm(['cover', 'contain', 'fill', 'inside', 'outside'])

        return (key === 'fit' && isKeyword(value))
            || (isKeyword(key) && value === '')
    },
    transform(key: string, value: string) {
        return { fit: !!value ? value : key }
    }
}