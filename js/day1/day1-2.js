// part 2
import { readFileSync } from 'fs'

const input = readFileSync('./js/input.txt', 'utf-8')
const lines = input.split('\n')

const replaceObj = {
    zero: 'z0ero',
    one: 'o1ne',
    two: 't2wo',
    three: 't3hree',
    four: 'f4our',
    five: 'f5ive',
    six: 's6ix',
    seven: 's7even',
    eight: 'e8ight',
    nine: 'n9ine',
}

const array = lines.filter((line) => line !== '')

for (let i = 0; i < array.length; i++) {
    Object.entries(replaceObj).forEach(([key, value]) => {
        array[i] = array[i].replaceAll(key, value)
    })

    const regex = /[a-z]+/gi
    array[i] = array[i].replace(regex, '')

    if (array[i].length === 1) {
        array[i] = array[i][0] + array[i][0]
    } else if (array[i].length > 2) {
        array[i] = array[i][0] + array[i][array[i].length - 1]
    }
}

const result = array.reduce((previous, current) => {
    return Number(previous) + Number(current)
}, 0)

console.log(result)
