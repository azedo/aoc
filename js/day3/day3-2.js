// part 2
//
// The missing part wasn't the only issue - one of the gears in the engine is wrong. A gear is any * symbol that is adjacent to exactly two part numbers. Its gear ratio is the result of multiplying those two numbers together.
// This time, you need to find the gear ratio of every gear and add them all up so that the engineer can figure out which gear needs to be replaced.

import { readFileSync } from 'fs'

const input = readFileSync('./js/day3/input.txt', 'utf-8')
const lines = input.split('\n')
const array = lines.filter((line) => line !== '')
const inputLength = array.length

const regex = /[*]/gi
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
    let total = []

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
        total = [Number([...before, ...current, ...after].join(''))]
    } else {
        if (before.length === 0) {
            total = [Number([...after].join(''))]
        } else if (after.length === 0) {
            total = [Number([...before].join(''))]
        } else {
            total = [Number([...before].join('')), Number([...after].join(''))]
        }
    }

    return total.filter((item) => item !== 0)
}

const total = []

Object.keys(result).forEach((item) => {
    result[item].forEach((partIndex) => {
        const lineIndex = Number(item)
        const smartIndex = partIndex - 1

        // check if line is first of the array
        if (lineIndex === 0) {
            const verify1 = checkNumbers(array[lineIndex], smartIndex)
            const verify2 = checkNumbers(array[lineIndex + 1], smartIndex)

            if (verify1.length === 1 && verify2.length === 1) {
                total.push(verify1[0] * verify2[0])
            } else if (verify1.length >= 2) {
                total.push(verify1[0] * verify1[1])
            } else if (verify2.length >= 2) {
                total.push(verify2[0] * verify2[1])
            }
        } else if (lineIndex === inputLength - 1) {
            const verify1 = checkNumbers(array[lineIndex - 1], smartIndex)
            const verify2 = checkNumbers(array[lineIndex], smartIndex)

            if (verify1.length === 1 && verify2.length === 1) {
                total.push(verify1[0] * verify2[0])
            } else if (verify1.length >= 2) {
                total.push(verify1[0] * verify1[1])
            } else if (verify2.length >= 2) {
                total.push(verify2[0] * verify2[1])
            }
        } else {
            const verify1 = checkNumbers(array[lineIndex - 1], smartIndex)
            const verify2 = checkNumbers(array[lineIndex], smartIndex)
            const verify3 = checkNumbers(array[lineIndex + 1], smartIndex)

            const verifyAll = [verify1, verify2, verify3]
            const totalVerify = []

            for (let i = 0; i < verifyAll.length; i++) {
                if (verifyAll[i].length >= 2) {
                    total.push(verifyAll[i][0] * verifyAll[i][1])
                } else if (verifyAll[i].length === 1) {
                    totalVerify.push(verifyAll[i][0])
                }
            }

            if (totalVerify.length === 2) {
                total.push(totalVerify[0] * totalVerify[1])
            }
        }
    })
})

const mainTotal = total.reduce((acc, curr) => {
    return acc + curr
}, 0)

console.log('result', mainTotal)
