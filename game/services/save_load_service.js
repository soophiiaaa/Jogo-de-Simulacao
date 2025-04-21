const prompt = require('prompt-sync')()
const fs = require('fs')
const path = require('path')

const Character = require('../core/character')
const { Catastrofe } = require('../core/event')

function readPlayers() {
    const filePath = path.join(__dirname, '../data/players.json')
    const data = fs.readFileSync(filePath, 'utf-8')
    const players = JSON.parse(data)
    return players
} //lê os jogadores salvos

function savePlayers(character) {
    const filePath = path.join(__dirname, '../data/players.json')
    const players = readPlayers()

    if (!players.find(p => p.name === character.name)) {
        players.push(character)
    }    

    fs.writeFileSync(filePath, JSON.stringify(players, null, 2), 'utf-8')
} //salva o jogador atual

function newGame() {
    const Items = require('../core/items')
    const description = require('../ui/description')
    const choose = require('../ui/choose')

    let name = prompt('Digite seu nome: ')
    let character = new Character(name)

    console.log(`Bem-vindo, ${name}! Seu novo jogo começou!`)

    let iniciar = prompt(`Pronto(a) para iniciar, (s/n)? `)

    if (iniciar === 's') {
        console.log(`Esse é o espírito! Aproveite a simulação!`)
    }

    if (iniciar === 'n') {
        console.log(`Todos nós deveríamos estar preparados para o fim do mundo, vamos começar mesmo assim! Aproveite a simulação!`)
    }

    let event = new Catastrofe()
    let items = new Items()


    description(character, event, items, choose)

    console.log(`===========================================================================`)
    console.log('Ao chegar no bunker, escutam-se os gritos de desespero... só resta esperar.\nSegundo o que as autoridades disseram, precisamos esperar no máximo 30 dias até que ocorram os resgates.')
    console.log(`===========================================================================`)
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

    let iniciar = prompt(`Pronto(a) para iniciar, (s/n)? `)

    if (iniciar === 's') {
        console.log(`Esse é o espírito! Aproveite a simulação!`)
    }

    if (iniciar === 'n') {
        console.log(`Todos nós deveríamos estar preparados para o fim do mundo, vamos começar mesmo assim! Aproveite a simulação!`)
    }

    if (!found) {
        console.log('Jogador não encontrado. Vamos começar um novo jogo!');
        newGame()
        return
    }

    console.log(`===========================================================================`)
    console.log('Ao chegar no bunker, escutam-se os gritos de desespero... só resta esperar.\nSegundo o que as autoridades disseram, precisamos esperar no máximo 30 dias até que ocorram os resgates.')
    console.log(`===========================================================================`)
} //carrega um novo jogo

module.exports = { readPlayers, savePlayers, newGame, loadGame }
