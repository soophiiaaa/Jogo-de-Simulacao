const Character = require('../core/character')
const { Catastrofe, Intergalactica, InvasaoAlienigena, ColapsoIA, RatosMutantes, Terremoto } = require('../core/event')
const Items = require('../core/items')

let character = new Character()
let event = new Catastrofe()
let items = new Items()

function badEnding(character, event) {
    console.log(`=================================`)
    console.log(`Essa não! ${character.name} não conseguiu sobreviver a ${event.nome}! 😵‍💫`)
    console.log(`========DETALHES DO JOGO========`)
    console.log(character.characterInformations())
}

function goodEnding(character, event) {
    console.log(`=================================`)
    console.log(`${character.name} sobreviveu com sucesso a ${event.nome}! É isso aí! 😎`)
    console.log(`========DETALHES DO JOGO========`)
    console.log(character.characterInformations())
}

function finalConditions(character, event, badEnding, goodEnding) {
    const hasFood = character.resources.some(item => item.category === 'food')
    
    if (!hasFood) {
        badEnding(character, event)
    } else if (character.days < 30) {
        badEnding(character,event)
    } else if (character.days === 30) {
        goodEnding(character, event)
    }
}

module.exports = { badEnding, goodEnding, finalConditions }

