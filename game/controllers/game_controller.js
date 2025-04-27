const { saveGameState, loadGameState, newGameData } = require("../services/save_load_service");
const description = require("../ui/description");
const chooseItems = require("../ui/choose");
const { runEvents } = require("./bunker_controller");

function showMenu() {
  console.log(`=====💥O MUNDO EM COLAPSO!💥=====`);
  console.log(`Olá! Bem-vindo(a) ao nosso jogo!`);
  console.log(`=================================`);
  console.log(`1 - Novo Jogo`);
  console.log(`2 - Carregar Jogo (em manutenção)`);
  console.log(`0 - Sair`);
  console.log(`=================================`);
}

async function startNewGame(prompt) {
  // coleta dados iniciais: personagem e evento inicial + eventDays salvados
  const { character, event, eventDays } = await newGameData(prompt);

  // descrição inicial e escolha de itens
  await description(character, event);
  console.log("Escolha o número dos seus itens (separados por espaço):");
  chooseItems(character, prompt);
  console.log(`Itens Selecionados: ${character.resources.join(", ")}\n`);

  // atualiza e salva estado após seleção de itens
  const gameState = loadGameState();
  gameState.resources = character.resources;
  saveGameState(gameState);

  // inicia loop de dias com os mesmos eventDays e mesmo event
  await runEvents(character, eventDays, event);

}

module.exports = { showMenu, startNewGame };
