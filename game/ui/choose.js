const Items = require("../core/items");

// Converte input numérico em recursos no character
function separateItems(input, items, character) {
  const selectedIds = input
    .split(" ")
    .map((item) => parseInt(item.trim(), 10))
    .filter((id) => !isNaN(id));

  selectedIds.forEach((id) => {
    const found = items.avaliableItems.find((it) => it.id === id);
    if (found && !character.resources.includes(found.name)) {
      character.addResources(found.name);
    }
  });
}

// Exibe prompt de seleção de itens usando a função de prompt injetada
function chooseItems(character, prompt) {
  const items = new Items();
  const input = prompt(
    "Escolha o número dos seus itens (separados por espaço): "
  );
  separateItems(input, items, character);
}

module.exports = chooseItems;
