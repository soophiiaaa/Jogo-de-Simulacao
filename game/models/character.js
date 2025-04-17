class Character {
    constructor(name) {
        this.name = name
        this.resources = []
        this.days = 0
    }

    avaliableResources() {
        return this.resources
    } //retorna os recursos disponíveis do jogador

    incrementDays() {
        this.days++
    } //adiciona mais um dia sobrevivido pelo jogador

    characterInformations() {
        return `Nome do Jogador: ${this.name}\nRecursos Disponíveis: ${this.resources}\nDias Sobrevividos: ${this.days}`
    } //retorna as informações do jogador
}

module.exports = Character
