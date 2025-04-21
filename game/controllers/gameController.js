const Character = require('../core/character')
const Event = require('../core/event')
const Items = require('../core/items')

const { readPlayers, savePlayers, newGame, loadGame } = require('../services/save_load_service')
const { badEnding, goodEnding, finalConditions } = require('../services/end_game_service')

const welcome = require('../ui/welcome')
const description = require('../ui/description')
const choose = require('../ui/choose')
