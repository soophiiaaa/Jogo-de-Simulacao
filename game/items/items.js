class Items {
    constructor() {
        this.avaliableItems = []
    }
}

class Food extends Items {
    constructor() {
        super()
        this.avaliableItems = [...this.avaliableItems, 'a', 'b', 'c', 'd'] //em testes para funcionalidade inicial
    }
}

class FirstAid extends Items {
    constructor() {
        super()
        this.avaliableItems = [...this.avaliableItems, 'a', 'b', 'c', 'd']
    }
}

class Survival extends Items {
    constructor() {
        super()
        this.avaliableItems = [...this.avaliableItems, 'a', 'b', 'c', 'd']
    }
}

module.exports = { Items, Food, FirstAid, Survival }
