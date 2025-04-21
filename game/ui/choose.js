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
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    }) //lê e exibe o que o usuário digitou

    const items = new Items();

    let timer = setTimeout(() => {
        console.log('⏰ O tempo acaba e você corre para um local seguro...')
        readline.close()
        callback(character)
    }, 60000) //limite de 60 segundos para o jogador escolher seus itens

    readline.question('Escolha o número dos seus itens: ', (input) => {
        separateItems(input, items, character)
        console.log(`Itens Selecionados: ${character.resources}`)
        clearTimeout(timer)
        readline.close()
        callback(character)
    })
} //função para jogador escolher seus itens

module.exports = chooseItems
