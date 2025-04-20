const Character = require('../models/character')
const Items = require('../items/items')

let character = new Character
let items = new Items

function separateItems(input, items, character) {
    character.resources = input.split(' ').map(item => parseInt(item.trim()))

    for (i = 0; i < character.resources.length; i++) {
        for (j = 0; j < items.avaliableItems.length; j++) {
            if (character.resources[i] === items.avaliableItems[j].id) {
                character.resources[i] = items.avaliableItems[j].name
            }
        }
    }
}

function chooseItems(character) {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    }) //lê e exibe o que o usuário digitou

    let timer

    timer = setTimeout(() => {
        console.log('⏰ O tempo acaba e você corre para um local seguro...')
        readline.close()
    }, 60000)

    console.log(items.avaliableItems)

    readline.question('Escolha o número dos seus itens: ', (input) => {
        separateItems(input, items, character)
        console.log(`Itens Selecionados: ${character.resources}`)
        clearTimeout(timer)
        readline.close()
    })
}

chooseItems(character)
