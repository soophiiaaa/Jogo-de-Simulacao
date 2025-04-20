const prompt = require('prompt-sync')()
const fs = require('fs')
const path = require('path')
const Character = require('../core/character') 

function readPlayers() {
    const filePath = path.join(__dirname, '../data/players.json')
    const data = fs.readFileSync(filePath, 'utf-8')
    const players = JSON.parse(data)
    return players
} //lê os jogadores salvos

function savePlayers(character) {
    const filePath = path.join(__dirname, '../data/players.json')
    const players = readPlayers()

    players.push(character)

    fs.writeFileSync(filePath, JSON.stringify(players, null, 2), 'utf-8')
} //salva o jogador atual

function newGame() {
    let name = prompt('Digite seu nome: ')
    let character = new Character()
    character.name = name
    savePlayers(character)
    console.log(`Bem-vindo, ${name}! Seu novo jogo começou!`)
} //inicia um novo jogo

function loadGame(callback) {
    const players = callback()

    let name = prompt('Qual o seu nome, sobrevivente? ')
    let found = false

    for (i = 0; i < players.length; i++) {
        if (players[i].name === name) {
            console.log(`Bem-vindo de volta, ${players[i].name}!`)
            found = true
            break
        }
    }

    if (!found) {
        console.log('Jogador não encontrado. Vamos começar um novo jogo!');
        newGame()
    }
}

module.exports = { readPlayers, newGame, loadGame }
