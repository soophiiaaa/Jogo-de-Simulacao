const prompt = require('prompt-sync')()
const Character = require('../character/character')
const character = new Character

function welcome(character) {
    console.log(`=====💥O MUNDO EM COLAPSO!💥=====`)
    console.log(`Olá! Bem-vindo(a) ao nosso jogo!`)

    let nome = prompt(`Como podemos te chamar? `)
    character.name = nome
    let iniciar = prompt(`Pronto(a) para iniciar, ${nome} (s/n)? `)

    if (iniciar === 's') {
        console.log(`Esse é o espírito! Aproveite a simulação!`)
    }

    if (iniciar === 'n') {
        console.log(`Todos nós deveríamos estar preparados para o fim do mundo, vamos começar mesmo assim! Aproveite a simulação!`)
    }

    console.log(`=================================`)
}

//welcome(character)

module.exports = welcome(character)
