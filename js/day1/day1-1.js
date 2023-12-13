// part 1
import { readFileSync } from 'fs'

const input = readFileSync('./js/input.txt', 'utf-8')
const lines = input.split('\n')

const regex = /[a-z]+/gi
for (let i = 0; i < lines.length; i++) {
    lines[i] = lines[i].replace(regex, '')

    if (lines[i].length === 1) {
        lines[i] = lines[i][0] + lines[i][0]
    } else if (lines[i].length > 2) {
        lines[i] = lines[i][0] + lines[i][lines[i].length - 1]
    }
}

const array = lines.filter((line) => line !== '')
console.log(array)

const result = array.reduce((previous, current) => {
    return Number(previous) + Number(current)
}, 0)

console.log(result)
