const readline = require('readline')

const Character = require('../core/character')
const Items = require('../core/items')

function separateItems(input, items, character) {
    let selected = input.split(' ').map(item => parseInt(item.trim()))

    let names = selected.map(id => {
        let found = items.avaliableItems.find(item => item.id === id)
        return found ? found.name : 'Item desconhecido'
    })

    names.forEach(name => {
        if (!character.resources.includes(name)) {
            character.addResources(name)
        }
    })
} //função que substitui o número do item escolhido pelo jogador para o nome

async function chooseItems(character, callback) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    const items = new Items()

    let timedOut = false

    let timer = setTimeout(() => {
        console.log('⏰ O tempo acaba e você corre para um local seguro...')
        timedOut = true
        rl.close()
        callback(character)
    }, 60000) // Limite de 60 segundos para o jogador escolher seus itens

    await new Promise((resolve) => {
        rl.question('Escolha o número dos seus itens: ', (input) => {
            if (!timedOut) {
                separateItems(input, items, character)
                console.log(`Itens Selecionados: ${character.resources.join(', ')}`)
                clearTimeout(timer)
                rl.close()
                callback(character)
            }
            resolve()
        })
    })
}

module.exports = chooseItems
