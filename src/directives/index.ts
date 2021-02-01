import { sizeDirective } from './size'
import { fitDirective } from './fit'
import { widthDirective } from './width'
import { heightDirective } from './height'
import { formatDirective } from './format'
import { positionDirective } from './position'
import { kernelDirective } from './kernel'

export interface Directive {
    name: string,
    with?: string[],
    without?: string[],
    test: (key: string, value: string) => boolean
    transform?: (key: string, value: string) => Record<string, any>
}

export function directives(): Directive[] {
    return [
        sizeDirective,
        widthDirective,
        heightDirective,
        formatDirective,
        positionDirective,
        fitDirective,
        kernelDirective
    ]
}