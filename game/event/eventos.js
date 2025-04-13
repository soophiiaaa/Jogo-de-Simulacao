class   Catastrofe {
   constructor(nome, descricao) {
    this.nome = nome
    this.descricao = descricao;
   }
   intoducao(){
    console.log(`Catastrofe: ${this.nome} Origem: ${this.descricao}`);
   }
}
//  let desastre = new Catastrofe("Guerra intergalatica", "Depois da invasão do lado mal da força os Jedi foram encontrar o Dater Vader para matar mas no fim acabou que o mundo entrou em colapso")
 
//  desastre.intoducao() 
//  testando ^

class Intergalactica extends Catastrofe {
   constructor(nome, descricao){
      super("Guerra Intergaláctica", "Depois da invasão do lado mal da força, os Jedi tentaram nos salvar, mas o mundo colapsou")
   }
}

class InvasaoAlienigina extends Catastrofe {
   constructor(nome, descricao){
      super("Invasão Alíenigina", "Os alíenginas pousaram na Terra e comecaram a capturar seres humanos")
   }
}

class ColapsoIA extends Catastrofe {
   constructor(nome, descricao){
      super("Colapso IA", "A inteligencia artificial que controlova o mundo se voltou contra a humanidade. Nada mais é seguro")
   }
}

class RatosMutantes extends Catastrofe {
   constructor(nome, descricao){
      super("Ratos Mutantes", "Experimentos genéticos secretos  deram errados. Agora, ratos do tamanho de um ursam dominam o planeta terra ")
   }
}

class Terremoto extends Catastrofe {
   constructor(nome, descricao){
      super("Terremoto", "Falhas tectonicas ao redor do planeta começaram a colapsar simultaneamente, engolindo cidades inteiras e mudando o mapa do mundo")
   }
}

const desastres = [
   new Intergalactica(),
   new InvasaoAlienigina(),
   new ColapsoIA(),
   new RatosMutantes(),
   new Terremoto()
];

module.exports = {
   Catastrofe,
   Intergalactica,
   InvasaoAlienigina,
   ColapsoIA,
   RatosMutantes,
   Terremoto,
   desastres
} 
