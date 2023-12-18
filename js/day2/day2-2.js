// part 2
//
// For each game, find the minimum set of cubes that must have been present. What is the sum of the power of these sets?

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
    const { games } = game

    const possibleGames = games.reduce(
        (acc, curr) => {
            return {
                blue: curr.blue > acc.blue ? curr.blue : acc.blue,
                green: curr.green > acc.green ? curr.green : acc.green,
                red: curr.red > acc.red ? curr.red : acc.red,
            }
        },
        { blue: 0, green: 0, red: 0 }
    )

    result += possibleGames.blue * possibleGames.green * possibleGames.red
})

console.log('result', result)
