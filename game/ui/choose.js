const prompt = require("prompt-sync")();

const Character = require("../core/character");
const Items = require("../core/items");

function separateItems(input, items, character) {
  let selected = input.split(" ").map((item) => parseInt(item.trim()));

  let names = selected.map((id) => {
    let found = items.avaliableItems.find((item) => item.id === id);
    return found ? found.name : "Item desconhecido";
  });

  names.forEach((name) => {
    if (!character.resources.includes(name)) {
      character.addResources(name);
    }
  });
} //função que substitui o número do item escolhido pelo jogador para o nome

function chooseItems(character, callback) {
  const items = new Items();

  let input = prompt(
    "Escolha o número dos seus itens (separados por espaço): "
  );
  separateItems(input, items, character);
  console.log(`Itens Selecionados: ${character.resources.join(", ")}`);
  callback(character);
}

module.exports = chooseItems;
