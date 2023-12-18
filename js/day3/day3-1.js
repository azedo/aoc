// part 1
//
// There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

import { readFileSync } from 'fs'

const input = readFileSync('./js/day3/input.txt', 'utf-8')
const lines = input.split('\n')
const array = lines.filter((line) => line !== '')
const inputLength = array.length

const regex = /[^0-9.]/gi
const result = {}
array.forEach((item, index) => {
    const matches = [...item.matchAll(regex)]

    if (matches) {
        for (const match of matches) {
            if (result[index]) {
                result[index].push(match.index + 1)
            } else {
                result[index] = [match.index + 1]
            }
        }
    }
})

const checkNumbers = (line, foundIndex) => {
    const newLine = line.split('')
    const matchNumber = /[0-9]/g
    let before = []
    let current = []
    let after = []
    let total = 0

    newLine.forEach((character, index) => {
        // foundIndex = symbol -> is it a number?
        // if yes, check if before and after are numbers
        // if no, check if before and after are numbers, but consider them two separate numbers

        if (index === foundIndex - 1 && character.match(matchNumber)) {
            let i = index
            while (newLine[i] && newLine[i].match(matchNumber) && i >= 0) {
                before.unshift(Number(newLine[i]))
                i--
            }
        } else if (index === foundIndex && character.match(matchNumber)) {
            if (character.match(matchNumber)) {
                current.push(Number(character))
            }
        } else if (index === foundIndex + 1 && character.match(matchNumber)) {
            let i = index
            while (
                newLine[i] &&
                newLine[i].match(matchNumber) &&
                i <= newLine.length
            ) {
                after.push(Number(newLine[i]))
                i++
            }
        }
    })

    if (current.length !== 0) {
        total = Number([...before, ...current, ...after].join(''))
    } else {
        total = Number([...before].join('')) + Number([...after].join(''))
    }

    return total
}

const total = []

Object.keys(result).forEach((item) => {
    result[item].forEach((partIndex) => {
        const lineIndex = Number(item)
        const smartIndex = partIndex - 1

        // check if line is first of the array
        if (lineIndex === 0) {
            total.push(checkNumbers(array[lineIndex], smartIndex))
            total.push(checkNumbers(array[lineIndex + 1], smartIndex))
        } else if (lineIndex === inputLength - 1) {
            total.push(checkNumbers(array[lineIndex - 1], smartIndex))
            total.push(checkNumbers(array[lineIndex], smartIndex))
        } else {
            total.push(checkNumbers(array[lineIndex - 1], smartIndex))
            total.push(checkNumbers(array[lineIndex], smartIndex))
            total.push(checkNumbers(array[lineIndex + 1], smartIndex))
        }
    })
})

const mainTotal = total.reduce((acc, curr) => {
    return acc + curr
}, 0)

console.log('result', mainTotal)
