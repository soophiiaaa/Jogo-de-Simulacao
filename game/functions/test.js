const description = require('./description')

const Character = require('../character/character')
const { Catastrofe, Intergalactica, InvasaoAlienigina, ColapsoIA, RatosMutantes, Terremoto } = require('../event/eventos')
const { Items, Food, FirstAid, Survival } = require('../items/items')

const character = new Character
const catastrofe = new Catastrofe
const items = new Items
const food = new Food
const firstaid = new FirstAid
const survival = new Survival

character.name = 'Sophia'
catastrofe.nome = 'Colapso IA'

description(character, catastrofe)
