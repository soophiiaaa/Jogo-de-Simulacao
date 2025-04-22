const Character = require("./character");
const character = new Character("Sophia");

for (let i = 0; i < 5; i++) {
  character.incrementDays();
}

console.assert(character.days === 5, "ERRO");

console.log(character.characterInformations());
