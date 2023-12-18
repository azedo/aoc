// part 1
//
// The newly-improved calibration document consists of lines of text; each line originally contained a specific calibration value that the Elves now need to recover. On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.

import { readFileSync } from 'fs'

const input = readFileSync('./js/day1/input.txt', 'utf-8')
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

const result = array.reduce((previous, current) => {
    return Number(previous) + Number(current)
}, 0)

console.log('result', result)
