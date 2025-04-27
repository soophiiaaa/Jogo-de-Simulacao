const Character = require("../core/character");
const {
  Catastrofe,
  Intergalactica,
  InvasaoAlienigena,
  ColapsoIA,
  RatosMutantes,
  Terremoto,
} = require("../core/event");
const Items = require("../core/items");

async function description(character, event) {
  console.log(`=====💥O MUNDO EM COLAPSO!💥=====`);
  console.log(`Catástrofe: ${event.nome}`);
  console.log(`Descrição: ${event.descricao}`);
  console.log(`\nEscolha seus itens para sobreviver:`);

  // Instancia o catálogo de itens aqui
  const itemsObj = new Items();
  itemsObj.avaliableItems.forEach((item) => {
    console.log(`${item.id}. ${item.name} - Categoria: ${item.category}`);
  });

  console.log(`============================================================================================`);
  // A função de escolha de itens (choose.js) será chamada de fora,
  // passando o `prompt` que você já injeta em game_controller.
}

module.exports = description;
