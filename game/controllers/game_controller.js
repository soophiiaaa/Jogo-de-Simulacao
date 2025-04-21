const prompt = require('prompt-sync')()
const { readPlayers, savePlayers, newGame, loadGame } = require('../services/save_load_service')
const{ gerarEventos, iniciarJogo } = require('./bunker_controller')

function startGame() {
    console.log(`=====💥O MUNDO EM COLAPSO!💥=====`)
    console.log(`Olá! Bem-vindo(a) ao nosso jogo!`)
    console.log(`=================================`)
    console.log(`1 - Novo Jogo`)
    console.log(`2 - Carregar Jogo`)
    console.log(`=================================`)

    let choice = parseInt(prompt('Escolha uma opção: '))

    if (choice === 1) {
        newGame()
        iniciarJogo()
    }

    if (choice === 2) {
        loadGame(readPlayers)
        iniciarJogo()
    }
}

startGame()

module.exports = startGame
