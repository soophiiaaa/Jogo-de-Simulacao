const prompt = require('prompt-sync')()

const Character = require('../character/character')
//const Event = require()
const Items = require('../items/items')

const character = new Character

function description(character, event) {
    console.log(`${character.name} estava tranquilo(a) em sua casa quando de repente os jornais são bombardeados com a seguinte notícia:\n"ALERTA! AVISO DE ${event.type}!\nBUSQUEM ABRIGO O MAIS RÁPIDO POSSÍVEL! GUARDEM SUPRIMENTOS E ITENS DE SOBREVIVÊNCIA!`)
    console.log(`De repente, tudo fica de cabeça pra baixo! Você olha ao redor e encontra os seguintes itens:`)
    console.log(items.food)
    console.log(items.firstaid)
    console.log(items.survival)
}

//funcionalidade em desenvolvimento
