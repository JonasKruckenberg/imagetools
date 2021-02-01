import { buildOptions } from "../../options"
import { positionDirective } from "../position"
import { widthDirective } from "../width"

describe('directive: "position"', () => {
    describe('argument: "top"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?width=300&position=top', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'top')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?width=300&top', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'top')
        })
    })

    describe('argument: "right top"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?width=300&position=right top', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'right top')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?width=300&right top', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'right top')
        })
    })

    describe('argument: "right"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?width=300&position=right', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'right')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?width=300&right', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'right')
        })
    })

    describe('argument: "right bottom"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?width=300&position=right bottom', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'right bottom')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?width=300&right bottom', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'right bottom')
        })
    })

    describe('argument: "bottom"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?width=300&position=bottom', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'bottom')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?width=300&bottom', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'bottom')
        })
    })

    describe('argument: "left bottom"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?width=300&position=left bottom', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'left bottom')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?width=300&left bottom', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'left bottom')
        })
    })

    describe('argument: "left"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?width=300&position=left', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'left')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?width=300&left', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'left')
        })
    })

    describe('argument: "left top"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?width=300&position=left top', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'left top')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?width=300&left top', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'left top')
        })
    })

    describe('argument: "north"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?width=300&position=north', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'north')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?width=300&north', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'north')
        })
    })

    describe('argument: "northeast"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?width=300&position=northeast', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'northeast')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?width=300&northeast', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'northeast')
        })
    })

    describe('argument: "east"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?width=300&position=east', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'east')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?width=300&east', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'east')
        })
    })

    describe('argument: "southeast"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?width=300&position=southeast', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'southeast')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?width=300&southeast', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'southeast')
        })
    })

    describe('argument: "south"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?width=300&position=south', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'south')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?width=300&south', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'south')
        })
    })

    describe('argument: "southwest"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?width=300&position=southwest', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'southwest')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?width=300&southwest', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'southwest')
        })
    })

    describe('argument: "west"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?width=300&position=west', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'west')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?width=300&west', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'west')
        })
    })

    describe('argument: "northwest"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?width=300&position=northwest', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'northwest')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?width=300&northwest', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'northwest')
        })
    })

    describe('argument: "center"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?width=300&position=center', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'center')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?width=300&center', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'center')
        })
    })

    describe('argument: "entropy"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?width=300&position=entropy', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'entropy')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?width=300&entropy', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'entropy')
        })
    })

    describe('argument: "attention"', () => {
        it('can be used as an argument', () => {
            const url = new URL('/test.jpg?width=300&position=attention', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'attention')
        })
        it('can be used as a shorthand', () => {
            const url = new URL('/test.jpg?width=300&attention', 'file://')
            expect(buildOptions(url, [positionDirective, widthDirective]))
                .toHaveProperty('position', 'attention')
        })
    })
})