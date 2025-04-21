const prompt = require('prompt-sync')()

const Character = require('../core/character')
const { Catastrofe, Intergalactica, InvasaoAlienigena, ColapsoIA, RatosMutantes, Terremoto } = require('../core/event')
const Items = require('../core/items')
const welcome = require('../ui/welcome')
const description = require('../ui/description')
const choose = require('../ui/choose')

try {
    let character = new Character()
    let event = new Catastrofe()
    let items = new Items()

    console.assert(character !== undefined, 'ERRO: falha ao criar personagem')
    console.assert(event !== undefined, 'ERRO: falha ao criar evento')
    console.assert(items !== undefined, 'ERRO: falha ao criar itens')

    // description(character, event, items, choose)
} 

catch (error) {
    console.error('Erro de execução')
    console.error(error.message)
}
