import { Directive } from "./index"
import pm from 'picomatch'

export const fitDirective: Directive = {
    name: 'fit',
    test(key: string, value: string) {
        if (key === 'fit') return true

        return pm.isMatch(key, ['cover', 'contain', 'fill', 'inside', 'outside']) && value === ''
    },
    transform(key: string, value: string) {
        return { fit: !!value ? value : key }
    }
}