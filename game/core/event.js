class Catastrofe {
  constructor(nome, descricao) {
    this.nome = nome;
    this.descricao = descricao;
  }

  introducao() {
    console.log(`Catástrofe: ${this.nome}`);
    console.log(`Descrição: ${this.descricao}`);
  }

  static gerarDesastreAleatorio() {
    const catastrofes = [
      new Intergalactica(),
      new InvasaoAlienigena(),
      new ColapsoIA(),
      new RatosMutantes(),
      new Terremoto()
    ];

    const aleatorio = Math.floor(Math.random() * catastrofes.length);
    return catastrofes[aleatorio];
  }
}

class Intergalactica extends Catastrofe {
  constructor() {
    super("Guerra Intergaláctica", "Depois da invasão do lado mal da força, os Jedi tentaram nos salvar, mas o mundo colapsou.");
  }
}

class InvasaoAlienigena extends Catastrofe {
  constructor() {
    super("Invasão Alienígena", "Os alienígenas pousaram na Terra e começaram a capturar seres humanos.");
  }
}

class ColapsoIA extends Catastrofe {
  constructor() {
    super("Colapso IA", "A inteligência artificial que controlava o mundo se voltou contra a humanidade. Nada mais é seguro.");
  }
}

class RatosMutantes extends Catastrofe {
  constructor() {
    super("Ratos Mutantes", "Experimentos genéticos secretos deram errado. Agora, ratos do tamanho de ursos dominam o planeta Terra.");
  }
}

class Terremoto extends Catastrofe {
  constructor() {
    super("Terremoto", "Falhas tectônicas ao redor do planeta começaram a colapsar simultaneamente, engolindo cidades inteiras e mudando o mapa do mundo.");
  }
}

module.exports = {
  Catastrofe,
  Intergalactica,
  InvasaoAlienigena,
  ColapsoIA,
  RatosMutantes,
  Terremoto
};
