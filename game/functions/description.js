const prompt = require('prompt-sync')()

const Character = require('../character/character')
//const Event = require()
const Items = require('../items/items')

const character = new Character
const catastrofe = new Catastrofe
const items = new Items
const food = new Food
const firstaid = new FirstAid
const survival = new Survival

function description(character, catastrofe) {
    console.log(`${character.name} estava tranquilo(a) em sua casa quando de repente os jornais são bombardeados com a seguinte notícia:\n"ALERTA! AVISO DE ${catastrofe.nome}!\nBUSQUEM ABRIGO O MAIS RÁPIDO POSSÍVEL! GUARDEM SUPRIMENTOS E ITENS DE SOBREVIVÊNCIA!`)
    console.log(`De repente, tudo fica de cabeça pra baixo! Você olha ao redor e encontra os seguintes itens:`)
    console.log(food.avaliableItems)
    console.log(firstaid.avaliableItems)
    console.log(survival.avaliableItems)
}

module.exports = description
