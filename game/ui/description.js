const prompt = require('prompt-sync')()
const Character = require('../core/character')
const { Catastrofe, Intergalactica, InvasaoAlienigena, ColapsoIA, RatosMutantes, Terremoto } = require('../core/event')
const Items = require('../core/items')
const choose = require('./choose')

let character = new Character()
let event = new Catastrofe()
let items = new Items()

function description(character, event, items, choose) {
    console.log(`${character.name} estava tranquilo(a) em sua casa quando de repente os jornais são bombardeados com a seguinte notícia:\n"ALERTA! AVISO DE ${event.nome}!\nBUSQUEM ABRIGO O MAIS RÁPIDO POSSÍVEL! GUARDEM SUPRIMENTOS E ITENS DE SOBREVIVÊNCIA!`)
    console.log(`De repente, tudo fica de cabeça pra baixo! Você olha ao redor e encontra os seguintes itens:`)
    console.log(items.category)

    choose()
}

module.exports = description
