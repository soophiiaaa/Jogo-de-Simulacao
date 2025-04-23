const fs = require("fs");
const path = require("path");
const prompt = require("prompt-sync")();

const Character = require("../core/character");
const Items = require("../core/items");

const arquivoPlayer = path.join(__dirname, "../data/players.json");
const arquivoHist = path.join(__dirname, "../data/historico.json");

let historico = [];

function carregarHistorico() {
  if (fs.existsSync(arquivoHist)) {
    try {
      historico = JSON.parse(fs.readFileSync(arquivoHist, "utf-8"));
      console.log("Histórico carregado com sucesso.");
    } catch (error) {
      console.log("Erro ao ler o arquivo JSON", error);
      historico = [];
    }
  } else {
    console.log("Arquivo de histórico não encontrado.");
  }
}

carregarHistorico();

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
  const total = Math.floor(Math.random() * (10 - 5 + 1)) + 5;

  const diaComEvento = new Set();

  while (diaComEvento.size < total) {
    const diaAleatorio = dias[Math.floor(Math.random() * dias.length)];
    diaComEvento.add(diaAleatorio);
  }

  diaComEvento.forEach((dia) => {
    const eventAleatorio = eventoA[Math.floor(Math.random() * eventoA.length)];
    eventosG.push({ dia, evento: eventAleatorio });
  });

  return eventosG;
}

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
  
    // Alterando os itens no inventário com base na escolha
    const playerData = JSON.parse(fs.readFileSync(arquivoPlayer, "utf-8"));
    const playerAtual = playerData[0];
    const character = new Character(playerAtual.name);
  
    if (evento.evento === "Colapso do estoque de água" && escolha === 2) {
      const aguaIndex = playerAtual.resources.indexOf("Garrafa de Água");
      if (aguaIndex !== -1) {
        playerAtual.resources.splice(aguaIndex, 1); // remove uma unidade
        console.log("Você usou 1 unidade de água.");
      } else {
        console.log("Você não tem água suficiente para usar.");
      }
    }
  
    if (evento.evento === "Fome extrema" && escolha === 2) {
      const comidaIndex = playerAtual.resources.indexOf("Barra de Proteína");
      if (comidaIndex !== -1) {
        playerAtual.resources.splice(comidaIndex, 1);
        console.log("Você usou uma barra de proteína para tentar saciar sua fome!");
      } else {
        console.log("Você não tem mais comida para comer!");
      }
    }
  
    fs.writeFileSync(arquivoPlayer, JSON.stringify(playerData, null, 2));
    registrarEvento(dia, evento, escolha);
  }

function registrarEvento(dia, evento, escolha) {
  historico.push({
    dia,
    evento: evento.evento,
    escolha: evento.opcoes[escolha - 1],
  });
  fs.writeFileSync(arquivoHist, JSON.stringify(historico, null, 2));
}

function iniciarJogo() {
  try {
    const playerData = JSON.parse(fs.readFileSync(arquivoPlayer, "utf-8"));
    const character = new Character(playerData.nome);

    character.incrementDays();
    console.log(`Dias sobrevividos: ${character.days}`);

    if (character.days > 0) {
      const diasDisponiveis = Array.from(
        { length: character.days },
        (_, i) => i + 1
      );
      const eventosGerados = gerarEventos(diasDisponiveis, eventoA);
      eventosGerados.forEach(({ dia, evento }) => {
        apresentarEscolha(dia, evento);
      });
    } else {
      console.log("O personagem não sobreviveu por nenhum dia.");
    }
  } catch (error) {
    console.log("Erro ao iniciar o jogo:", error);
  }
}

iniciarJogo();
