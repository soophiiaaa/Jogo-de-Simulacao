const Character = require('../models/character')
const { Items, Food, FirstAid, Survival } = require('../items/items')

let character = new Character
let items = new Items
let food = new Food
let firstaid = new FirstAid
let survival = new Survival

function chooseItems(character) {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    }) //lê e exibe o que o usuário digitou

    let timer

    readline.question('Escolha o número dos seus itens: ', (input) => {

        

        character.resources.push(input)
        clearTimeout(timer)
        readline.close()
    })

    setTimeout(() => {
        console.log('⏰ O tempo acaba e você corre para um local seguro...')
        console.log(character.resources)
        readline.close()
    }, 6000)
}

chooseItems(character)
