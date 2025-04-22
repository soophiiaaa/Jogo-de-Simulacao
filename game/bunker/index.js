const fs = require("fs") //métodos filesystem (sistemas de arquivo) - leitura e escrita
const path = require("path") //importa ferramentas para caminhos de arquivo
const prompt = require("prompt-sync")() //standard input para o usuário

const Character = require("../core/character") //cria um objeto personagem
const Items = require("../core/items") //cria um objeto com uma lista de itens disponíveis

//encontra o caminho para o arquivo de dados do jogador
const arquivoPlayer = path.join(__dirname, "../data/players.json")
const arquivoHist = path.join(__dirname, "../data/historico.json")

//variável auxiliar para guardar o histórico de ações do jogador
let historico = []

//se o arquivo de histórico já existe, lê, caso contrário, retorna um erro e a variável auxiliar continua vazia.
if (fs.existsSync(arquivoHist)) {
  try {
    historico = JSON.parse(fs.readFileSync(arquivoHist, "utf-8"))
  } catch (error) {
    console.log("Erro ao ler o arquivo JSON: ", error)
    historico = []
  }
}

//definindo os eventos disponíveis no jogo
const eventoA = [
  {
    evento: "Encontro com um estranho",
    opcoes: ["Deixar entrar", "Ignorar"]
  },
  {
    evento: "Falha no sistema de ventilação",
    opcoes: ["Consertar", "Ignorar"],
  },
  {
    evento: "Um animal começa a atacar a porta",
    opcoes: ["Pressionar a porta", "Pôr algo pesado"],
  },
  { evento: "Sinal de rádio de socorro", opcoes: ["Responder", "Ignorar"] },
  {
    evento: "Tempestade de radiação",
    opcoes: ["Selar as entradas", "Ficar quieto"],
  },
  {
    evento: "Sistema de energia falhando",
    opcoes: ["Consertar", "Desligar para economizar energia"],
  },
  { evento: "Mensagem enigmática", opcoes: ["Investigar", "Ignorar"] },
  {
    evento: "Colapso do estoque de água",
    opcoes: ["Procurar uma solução", "Sair para procurar água"],
  },
  {
    evento: "Fome extrema",
    opcoes: ["Racionar", "Sair para procurar comida"]
  },
]

//função para gerar eventos aleatórios durante os dias do jogo
function gerarEventos(dias, eventoA) {
  const eventosG = []

  const diaComEvento = new Set()

  let total = 30

  while (diaComEvento.size < total) {
    const diaAleatorio = dias[Math.floor(Math.random() * dias.length)]
    diaComEvento.add(diaAleatorio)
  }

  //relaciona cada dia do conjunto a um evento, também escolhido aleatoriamente
  diaComEvento.forEach((dia) => {
    const eventAleatorio = eventoA[Math.floor(Math.random() * eventoA.length)]
    eventosG.push({ dia, evento: eventAleatorio })
  })

  //retorna o array de pares {dia: evento} gerado
  return eventosG
}

//função para apresentar as escolhas do evento
function apresentarEscolha(dia, evento) {
  //escreve para o usuário o dia atual e o evento do dia
  console.log(`Dia: ${dia}`)
  console.log(`Evento: ${evento.evento}`)

  //escreve todas as opções para o evento, juntamente com seu índice para escolha
  evento.opcoes.forEach((opcao, index) => {
    console.log(`${index + 1}: ${opcao}`)
  })

  //prompt de escolha para o usuário
  let escolha = parseInt(prompt("Escolha uma opção (1 ou 2): "), 10)

  //assegura que o usuário digite apenas as escolhas exibidas
  while (![1, 2].includes(escolha)) {
    console.log("Escolha inválida! Por favor, escolha 1 ou 2.")
    escolha = parseInt(prompt("Escolha uma opção (1 ou 2): "), 10)
  }

  //imprime para o usuário sua escolha
  console.log(`Você escolheu: ${evento.opcoes[escolha - 1]}`)

  //as melhores escolhas sempre possuem índice 1
  if (escolha === 1) {
    console.log("Você tomou a melhor decisão!")
  } else {
    console.log("Você tomou uma decisão ruim!")
  }

  //lê os dados do usuário pelo arquivo
  const playerData = JSON.parse(fs.readFileSync(arquivoPlayer, "utf-8"))

  //verifica as escolhas nos eventos de água e comida
  if (evento.evento === "Colapso do estoque de água" && escolha === 2) {
    //se o evento for de água, debita uma garrafa de água do estoque do usuário
    const aguaIndex = playerData.items.findIndex(
      (item) => item.name === "Garrafa de Água"
    )
    if (aguaIndex !== -1) {
      playerData.items[aguaIndex].quantity -= 1
      if (playerData.items[aguaIndex].quantity <= 0) {
        playerData.items.splice(aguaIndex, 1) //remove o item se a quantidade chegar a 0
      }
      console.log("Você usou 1 unidade de água.")
    } else {
      console.log("Você não tem água suficiente para usar.")
    }
  } else if (evento.evento === "Fome extrema" && escolha === 2) {
    const comidaIndex = playerData.items.findIndex(
      (item) => item.name === "Barra de Proteína"
    )
    if (comidaIndex !== -1) {
      playerData.items[comidaIndex].quantity -= 1
      if (playerData.items[comidaIndex].quantity <= 0) {
        playerData.items.splice(comidaIndex, 1) //remove item se a quantidade chegar a 0
      }
      console.log(
        "Você usou uma barra de proteína para tentar saciar sua fome!"
      )
    } else {
      console.log("Você não tem mais comida para comer!")
    }
  }

  //salva o novo estado do inventário no player.json
  fs.writeFileSync(arquivoPlayer, JSON.stringify(playerData, null, 2))

  //registrar o evento e a escolha no histórico
  registrarEvento(dia, evento, escolha)
}

//função para registrar eventos no histórico
function registrarEvento(dia, evento, escolha) {
  let registroAtual = []
  if (fs.existsSync(arquivoHist)) {
    const dados = fs.readFileSync(arquivoHist, "utf-8")
    registroAtual = JSON.parse(dados)
  }

  registroAtual.push({
    dia,
    evento: evento.evento,
    escolha: evento.opcoes[escolha - 1],
  })
  fs.writeFileSync(arquivoHist, JSON.stringify(registroAtual, null, 2))
}

function iniciarJogo() {
  const playerData = JSON.parse(fs.readFileSync(arquivoPlayer, "utf-8"))
  const character = new Character(playerData.name)

  character.incrementDays()

  const eventosGerados = gerarEventos(character.days, eventoA) // Passando o número de dias do jogador
  eventosGerados.forEach(({ dia, evento }) => {
    apresentarEscolha(dia, evento)
  })
}

console.log(iniciarJogo())
