const fs = require("fs"); // Biblioteca para ler e escrever arquivos
const path = require("path"); // Biblioteca para lidar com caminhos de arquivos
const prompt = require("prompt-sync")(); // Biblioteca para receber entrada do usuário via terminal

const Character = require("../core/character"); // Classe do personagem
const Items = require("../core/items"); // Classe de itens disponíveis

// Caminhos para os arquivos JSON
const arquivoPlayer = path.join(__dirname, "../data/players.json");
const arquivoHist = path.join(__dirname, "../data/historico.json");

// Array que armazenará o histórico dos eventos do jogador
let historico = [];

// Função que garante que o histórico seja carregado corretamente
function carregarHistorico() {
  if (fs.existsSync(arquivoHist)) {
    try {
      historico = JSON.parse(fs.readFileSync(arquivoHist, "utf-8"));
    } catch (error) {
      console.log("Erro ao ler o arquivo JSON", error);
      historico = [];
    }
  }
}

// Carrega o histórico ao iniciar o programa
carregarHistorico();

// Lista de possíveis eventos do jogo
const eventoA = [
  { evento: "Encontro com um estranho", opcoes: ["Deixar entrar", "Ignorar"] },
  { evento: "Falha no sistema de ventilação", opcoes: ["Consertar", "Ignorar"] },
  { evento: "Um animal começa a atacar a porta", opcoes: ["Pressionar a porta", "Por algo pesado"] },
  { evento: "Sinal de rádio de socorro", opcoes: ["Responder", "Ignorar"] },
  { evento: "Tempestade de radiação", opcoes: ["Selar as entradas", "Ficar quieto"] },
  { evento: "Sistema de energia falhando", opcoes: ["Consertar", "Desligar para economizar energia"] },
  { evento: "Mensagem enigmática", opcoes: ["Investigar", "Ignorar"] },
  { evento: "Colapso do estoque de água", opcoes: ["Procurar uma solução", "Sair para procurar água"] },
  { evento: "Fome extrema", opcoes: ["Racionar", "Sair para procurar comida"] },
];

function gerarEventos(dias, eventoA) {
  const eventosG = [];
  const total = Math.floor(Math.random() * (10 - 5 + 1)) + 5; // Entre 5 e 10 eventos
  const diaComEvento = new Set();

  // Filtra os dias para só considerar a partir do dia 3
  const diasValidos = dias.filter((dia) => dia >= 3);

  if (diasValidos.length < total) {
    console.log("Dias disponíveis insuficientes para gerar eventos.");
    return eventosG;
  }

  while (diaComEvento.size < total) {
    const diaAleatorio = diasValidos[Math.floor(Math.random() * diasValidos.length)];
    diaComEvento.add(diaAleatorio);
  }

  diaComEvento.forEach((dia) => {
    const eventAleatorio = eventoA[Math.floor(Math.random() * eventoA.length)];
    eventosG.push({ dia, evento: eventAleatorio });
  });

  return eventosG;
}

// Função para apresentar o evento e registrar a escolha do jogador
function apresentarEscolha(dia, evento) {
  console.log(`Dia: ${dia}`);
  console.log(`Evento: ${evento.evento}`);

  evento.opcoes.forEach((opcao, index) => {
    console.log(`${index + 1}: ${opcao}`);
  });

  let escolha = parseInt(prompt("Escolha uma opção (1 ou 2): "));

  while (![1, 2].includes(escolha)) {
    console.log("Escolha inválida! Por favor, escolha 1 ou 2.");
    escolha = parseInt(prompt("Escolha uma opção (1 ou 2): "));
  }

  console.log(`Você escolheu: ${evento.opcoes[escolha - 1]}`);

  // Lê o jogador atual do arquivo
  const playerData = JSON.parse(fs.readFileSync(arquivoPlayer, "utf-8"));
  const playerAtual = playerData[0]; // Pega o primeiro personagem
  const character = new Character(playerAtual.name); // Cria o personagem
  const items = new Items(); // Cria os itens disponíveis

  // Lógica de consumo de recursos com base no evento e escolha
  if (evento.evento === "Colapso do estoque de água" && escolha === 2) {
    const agua = items.avaliableItems.find(item => item.name === "Garrafa de Água");
    const aguaIndex = playerAtual.resources.findIndex(resource => resource.id === agua.id);
    if (aguaIndex !== -1) {
      playerAtual.resources.splice(aguaIndex, 1); // Remove uma garrafa de água
      console.log("Você usou 1 unidade de água.");
    } else {
      console.log("Você não tem água suficiente para usar.");
    }
  } else if (evento.evento === "Fome extrema" && escolha === 2) {
    const comida = items.avaliableItems.find(item => item.name === "Barra de Proteína");
    const comidaIndex = playerAtual.resources.findIndex(resource => resource.id === comida.id);
    if (comidaIndex !== -1) {
      playerAtual.resources.splice(comidaIndex, 1); // Remove uma barra de proteína
      console.log("Você usou uma barra de proteína para tentar saciar sua fome!");
    } else {
      console.log("Você não tem mais comida para comer!");
    }
  }

  // Atualiza o arquivo com o novo estado do jogador
  fs.writeFileSync(arquivoPlayer, JSON.stringify(playerData, null, 2));

  // Registra o evento no histórico
  registrarEvento(dia, evento, escolha);
}

// Função para registrar os eventos no histórico do jogador
function registrarEvento(dia, evento, escolha) {
  historico.push({
    dia,
    evento: evento.evento,
    escolha: evento.opcoes[escolha - 1],
  });
  fs.writeFileSync(arquivoHist, JSON.stringify(historico, null, 2));
}

// Função principal que gera e executa os eventos durante o jogo
function iniciarEventos() {
  try {
    const playerData = JSON.parse(fs.readFileSync(arquivoPlayer, "utf-8"));
    const playerAtual = playerData[0]; // Lê o primeiro personagem
    const character = new Character(playerAtual.name); // Cria o personagem com o nome do JSON

    character.incrementDays(); // Aumenta a contagem de dias sobrevividos

    if (character.days > 0) {
      const diasDisponiveis = Array.from({ length: character.days }, (_, i) => i + 1);
      const eventosGerados = gerarEventos(diasDisponiveis);
      eventosGerados.forEach(({ dia, evento }) => {
        apresentarEscolha(dia, evento);
      });
    }
  } catch (error) {
    console.log("Erro ao iniciar os eventos:", error);
  }
}

// Executa os eventos no jogo
iniciarEventos();

module.exports = { iniciarEventos };
