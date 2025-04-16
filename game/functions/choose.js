const prompt = require('prompt-sync')

const Character = require('../character/character') 
const { Items, Food, FirstAid, Survival } = require('../items/items')

let character = new Character

function chooseItems(character) {
    let choose = parseInt(prompt('Escolha seus itens dentro de 60 segundos: '))
}