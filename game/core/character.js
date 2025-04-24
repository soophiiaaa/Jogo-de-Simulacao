const id = require("./id");

class Character {
  constructor(name, resources = [], days = 0) {
    this.id = id();
    this.name = name;
    this.resources = resources;
    this.days = days;
  } //construtor da classe Character, que representa o jogador no jogo
  //com id, nome, recursos e dias sobrevividos

  availableResources() {
    return this.resources;
  } //retorna os recursos disponíveis do jogador

  incrementDays() {
    this.days++;
  } //adiciona mais um dia sobrevivido pelo jogador

  addResources(resource) {
    this.resources.push(resource);
  } //adicionar recursos para os jogadores

  characterInformations() {
    return `Nome do Jogador: ${this.name}\nRecursos Disponíveis: ${this.resources}\nDias Sobrevividos: ${this.days}`;
  } //retorna as informações do jogador
}

module.exports = Character;
