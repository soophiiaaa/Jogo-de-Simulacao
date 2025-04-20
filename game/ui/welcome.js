const prompt = require('prompt-sync')()
const { readPlayers, newGame, loadGame } = require('../services/save_load_service')

function welcome() {
    console.log(`=====💥O MUNDO EM COLAPSO!💥=====`)
    console.log(`Olá! Bem-vindo(a) ao nosso jogo!`)
    console.log(`=================================`)
    console.log(`1 - Novo Jogo`)
    console.log(`2 - Carregar Jogo`)
    console.log(`=================================`)
    
    let choice = parseInt(prompt('Escolha uma opção: '))

    if (choice === 1) {
        newGame()
    }

    if (choice === 2) {
        loadGame(readPlayers)
    }

    let iniciar = prompt(`Pronto(a) para iniciar, (s/n)? `)

    if (iniciar === 's') {
        console.log(`Esse é o espírito! Aproveite a simulação!`)
    }

    if (iniciar === 'n') {
        console.log(`Todos nós deveríamos estar preparados para o fim do mundo, vamos começar mesmo assim! Aproveite a simulação!`)
    }

    console.log(`=================================`)
} //apresentação inicial para jogador

welcome()

module.exports = welcome
