// Run with: node --watch js 1 1
import { existsSync } from 'fs'
import { mkdir, writeFile, copyFile } from 'fs/promises'
;(async () => {
    const args = process.argv.slice(2)
    const day = args[0]
    let part = args[1] || 1

    // check if day is passed
    if (!day) {
        console.log(`
You need to pass at least one argument - the day number
Example: node --watch js 1

You can also pass a second argument - the part number
Example: node --watch js 1 2

If you don't pass the second argument, it will run the first part.
`)

        process.exit(1)
    }

    const dir = `./js/day${day}`
    const file = `${dir}/day${day}-${part}.js`
    const content = `// part ${part}
//
// [add description here]] 

import { readFileSync } from 'fs'

const input = readFileSync('./js/day${day}/input.txt', 'utf-8')
const lines = input.split('\\n')
const array = lines.filter((line) => line !== '')

const result = '<IMPLEMENT ME!>'

// your code goes here...

// log the result
console.log('result', result)
`

    // check if we have a file for the day
    if (!existsSync(file)) {
        console.log(`File ${file} not found! Creating it now... ;)`)

        try {
            await copyFile(`${dir}/day${day}-${part - 1}.js`, file)

            console.log(`File for day ${day} created successfully!!

It was copied from day ${day} part ${part - 1}.

You can now run it with:
node --watch js ${day} ${part}

Happy coding! ;)
`)
        } catch (err) {
            console.error(err)
        }
    }

    console.log(`
Running day ${day} part ${part}
---
`)

    if (!existsSync(dir)) {
        console.log(`
Day ${day} folder doesn't exist yet. Creating it now... ;)
`)

        try {
            await mkdir(dir)
            await writeFile(file, content, 'utf8')
            await writeFile(`${dir}/input.txt`, 'add your input here!', 'utf8')

            console.log(`Folder and files for day ${day} created successfully!!

You can now run it with:
node --watch js ${day} ${part}

Happy coding! ;)
`)
        } catch (err) {
            console.error(err)
        }
    } else {
        if (!args[1]) part = 2

        let openFile = `./day${day}/day${day}-${part}.js`
        if (!existsSync(`./js/${openFile}`)) {
            part = 1
            openFile = `./day${day}/day${day}-${part}.js`
        }

        import(openFile)
    }
})()
