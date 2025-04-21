const Character = require('../core/character')
const Event = require('../core/event')
const { readPlayers, newGame, loadGame } = require('../services/save_load_service')
const end_game_service = require('../services/end_game_service')

let character = new Character

