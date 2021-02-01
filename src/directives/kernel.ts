import { Directive } from "./index"
import pm from 'picomatch'

export const kernelDirective: Directive = {
    name: 'kernel',
    with: ['width', 'height', 'size'],

    test(key: string, value: string) {
        return key === 'kernel' && pm.isMatch(value, [
            'nearest',
            'cubic',
            'mitchell',
            'lanczos2',
            'lanczos3'
        ])
    }
}
