// part 1
//
// Determine which games would have been possible if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes. What is the sum of the IDs of those games?

import { readFileSync } from 'fs'

const input = readFileSync('./js/day2/input.txt', 'utf-8')
const lines = input.split('\n')
const array = lines.filter((line) => line !== '')

const regex = /[a-z]/gi
const games = array.map((line) => {
    const [id, games] = line.split(':')
    const allGames = games
        .trim()
        .split(';')
        .map((game) => {
            const gameInfoRaw = game.split(',')
            const gameInfo = gameInfoRaw.filter((item) => item !== '')

            const gameObj = {}
            gameInfo.forEach((info) => {
                const [score, color] = info.trim().split(' ')
                gameObj[color] = Number(score)
            })
            return gameObj
        })

    return { id: id.replace(regex, '').trim(), games: allGames }
})

let result = 0

games.forEach((game) => {
    const { id, games } = game
    const possibleGames = !games.some((game) => {
        const { blue, green, red } = game
        return blue > 14 || green > 13 || red > 12
    })

    if (possibleGames) {
        result += Number(id)
    }
})

console.log('result', result)
