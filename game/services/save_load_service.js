const fs = require("fs");
const path = require("path");
const { Catastrofe } = require("../core/event");
const Character = require("../core/character");

const playersFile = path.join(__dirname, "../data/players.json");
const historicoFile = path.join(__dirname, "../data/historico.json");

// Salva estado completo do jogo (incluindo dias e dias de evento)
function saveGameState(state) {
  fs.writeFileSync(playersFile, JSON.stringify(state, null, 2));
}

function loadGameState() {
  if (!fs.existsSync(playersFile)) return null;
  return JSON.parse(fs.readFileSync(playersFile, "utf-8"));
}

const registroHistorico = {
  load() {
    if (!fs.existsSync(historicoFile)) return [];
    return JSON.parse(fs.readFileSync(historicoFile, "utf-8"));
  },
  save(dia, evento, escolha) {
    const hist = this.load();
    hist.push({ dia, evento: evento.nome, escolha });
    fs.writeFileSync(historicoFile, JSON.stringify(hist, null, 2));
  },
};

// Gera lista aleatória de dias para ocorrências, uma única vez
function generateEventDays(totalDias = 30) {
  const numEvents = Math.floor(Math.random() * 6) + 5; // 5 a 10
  const days = Array.from({ length: totalDias }, (_, i) => i + 1);
  const shuffled = days.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numEvents).sort((a, b) => a - b);
}

async function newGameData(prompt) {
  const name = prompt("Digite seu nome: ");
  const character = new Character(name, [], 0);
  const event = Catastrofe.gerarDesastreAleatorio();
  const eventDays = generateEventDays();

  // Estado inicial completo: personagem + dias de evento + progresso
  const gameState = {
    name: character.name,
    resources: [],
    days: 0,
    event: { nome: event.nome, descricao: event.descricao },
    eventDays,
  };
  saveGameState(gameState);

  return { character, event, eventDays };
}

module.exports = { saveGameState, loadGameState, registroHistorico, newGameData };
