/**
 * This is a very makeshift documentation generator for the import directives.
 * It parses all the files in the `src/directives` folder an generates the `docs/directives.md` file.
 * It currently only supports a few tags:
 * @name The human readable name of the directive
 * @keyword The keyword this directive matches
 * @type The type this directive requires
 * @shorthands This documents possible shorthands
 * @example An example of the directive in action
 * Might change in the future.
 */
const glob = require('tiny-glob')
const fs = require('fs/promises')
const { parse } = require('comment-parser')


async function main() {
    const files = await glob('src/directives/*.ts')

    const toc = []
    const sections = []

    for (const file of files) {
        const data = await fs.readFile(file, 'utf-8')

        const parsed = parse(data, { spacing: 'preserve' })

        for (const comment of parsed) {
            try {
                const section = generateSection(comment)
                toc.push(section.name)
                sections.push(section.data)
            } catch (e) {
                console.log(e);
            }
        }
    }


    const out = `# Import Directives

## Table of Contents

${toc.filter(n => !!n).map(name => `- [${name}](#${name.toLowerCase()})`).join('\n')}

${sections.join('___\n')}
`
    await fs.writeFile('docs/directives.md', out)
}
main()

const tags = {
    name: tag => {
        return tag.name
    },
    keyword: tag => {
        return `• **Keyword**: ${tag.name + tag.description}<br>`
    },
    shorthands: tag => {
        return `• **Shorthands**: ${tag.name + tag.description}<br>`
    },
    type: tag => {
        return `• **Type**: ${tag.name + tag.description}<br>`
    },
    example: tag => {
        return `• **Example**: ${tag.name} ${tag.description}`
    }
}

function generateSection(comment) {

    const out = {}
    for (const tag of comment.tags) {
        if (tag.tag in tags) {
            out[tag.tag] = tags[tag.tag](tag)
        }
    }

    const { name, example, ...rest } = out

    const data = `
### ${name}
${Object.values(rest).join('\n')}

${comment.description}

${example}
`

    return { data, ...out }
}