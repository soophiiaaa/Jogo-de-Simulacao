const prompt = require("prompt-sync")();
const {
  readPlayers,
  savePlayers,
  newGame,
  loadGame,
} = require("../services/save_load_service");
const{ iniciarEventos} = require('./bunker_controller')

function startGame() {
  console.log(`=====💥O MUNDO EM COLAPSO!💥=====`);
  console.log(`Olá! Bem-vindo(a) ao nosso jogo!`);
  console.log(`=================================`);
  console.log(`1 - Novo Jogo`);
  console.log(`2 - Carregar Jogo (em manutenção)`);
  console.log(`=================================`);

  let choice = parseInt(prompt("Escolha uma opção: "));

  while (choice !== 1 && choice !== 2) {
    choice = parseInt(prompt("Escolha uma opção: "));
  }

  if (choice === 1) {
    newGame();
    iniciarEventos()
  }

  if (choice === 2) {
    console.log(
      "A opção 'Carregar Jogo' está em manutenção. Tente novamente mais tarde."
    );
  }
}

module.exports = startGame;
