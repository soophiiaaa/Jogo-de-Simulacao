const fs = require('fs')
const path = require('path')
const prompt = require('prompt-sync')()

const Character = require('../core/character')
const Items = require("../core/items")

const arquivoPlayer = path.join(__dirname, '../data/players.json')
const arquivoHist = path.join(__dirname, '../data/historico.json')

let historico = []

// Função para garantir que o arquivo de histórico existe e seja lido corretamente
function carregarHistorico() {
    if (fs.existsSync(arquivoHist)) {
        try {
            historico = JSON.parse(fs.readFileSync(arquivoHist, "utf-8"))
        } catch (error) {
            console.log("Erro ao ler o arquivo JSON", error)
            historico = []
        }
    }
}

carregarHistorico()

const eventoA = [
    { evento: "Encontro com um estranho", opcoes: ["Deixar entrar", "Ignorar"] },
    { evento: "Falha no sistema de ventilação", opcoes: ["Consertar", "Ignorar"] },
    { evento: "Um animal começa a atacar a porta", opcoes: ["Pressionar a porta", "Por algo pesado"] },
    { evento: "Sinal de rádio de socorro", opcoes: ["Responder", "Ignorar"] },
    { evento: "Tempestade de radiação", opcoes: ["Selar as entradas", "Ficar quieto"] },
    { evento: "Sistema de energia falhando", opcoes: ["Consertar", "Desligar para economizar energia"] },
    { evento: "Mensagem enigmática", opcoes: ["Investigar", "Ignorar"] },
    { evento: "Colapso do estoque de água", opcoes: ["Procurar uma solução", "Sair para procurar água"] },
    { evento: "Fome extrema", opcoes: ["Racionar", "Sair para procurar comida"] }
]

// Função para gerar eventos aleatórios
function gerarEventos(dias, eventoA) {
    const eventosG = []
    const total = Math.floor(Math.random() * (10 - 5 + 1)) + 5

    const diaComEvento = new Set()

    while (diaComEvento.size < total) {
        const diaAleatorio = dias[Math.floor(Math.random() * dias.length)]
        diaComEvento.add(diaAleatorio)
    }

    diaComEvento.forEach(dia => {
        const eventAleatorio = eventoA[Math.floor(Math.random() * eventoA.length)]
        eventosG.push({ dia, evento: eventAleatorio })
    })

    return eventosG
}

// Função para apresentar a escolha ao jogador
function apresentarEscolha(dia, evento) {
    console.log(`Dia: ${dia}`)
    console.log(`Evento: ${evento.evento}`)

    evento.opcoes.forEach((opcao, index) => {
        console.log(`${index + 1}: ${opcao}`)
    })

    let escolha = parseInt(prompt("Escolha uma opção (1 ou 2): "))

    while (![1, 2].includes(escolha)) {
        console.log("Escolha inválida! Por favor, escolha 1 ou 2.");
        escolha = parseInt(prompt("Escolha uma opção (1 ou 2): "));
    }

    console.log(`Você escolheu: ${evento.opcoes[escolha - 1]}`)

    // Alterando os itens no inventário com base na escolha
    const playerData = JSON.parse(fs.readFileSync(arquivoPlayer, "utf-8"))
    const items = new Items()

    // Verificando a escolha e ajustando o inventário
    if (evento.evento === "Colapso do estoque de água" && escolha === 2) {
        const aguaIndex = playerData.items.findIndex(item => item.name === "Garrafa de Água")
        if (aguaIndex !== -1) {
            playerData.items[aguaIndex].quantity -= 1
            if (playerData.items[aguaIndex].quantity <= 0) {
                playerData.items.splice(aguaIndex, 1) // Remove o item se a quantidade chegar a 0
            }
            console.log("Você usou 1 unidade de água.")
        } else {
            console.log("Você não tem água suficiente para usar.")
        }
    } else if (evento.evento === "Fome extrema" && escolha === 2) {
        const comidaIndex = playerData.items.findIndex(item => item.name === 'Barra de Proteína')
        if (comidaIndex !== -1) {
            playerData.items[comidaIndex].quantity -= 1
            if (playerData.items[comidaIndex].quantity <= 0) {
                playerData.items.splice(comidaIndex, 1) // Remove item se a quantidade chegar a 0
            }
            console.log('Você usou uma barra de proteína para tentar saciar sua fome!')
        } else {
            console.log('Você não tem mais comida para comer!')
        }
    }

    // Salva o novo estado do inventário no player.json
    fs.writeFileSync(arquivoPlayer, JSON.stringify(playerData, null, 2))

    // Registra o evento e a escolha no histórico
    registrarEvento(dia, evento, escolha)
}

// Função para registrar o evento no histórico
function registrarEvento(dia, evento, escolha) {
    historico.push({ dia, evento: evento.evento, escolha: evento.opcoes[escolha - 1] })
    fs.writeFileSync(arquivoHist, JSON.stringify(historico, null, 2))
}

// Função para iniciar o jogo
function iniciarJogo() {
    try {
        const playerData = JSON.parse(fs.readFileSync(arquivoPlayer, 'utf-8'))
        const character = new Character(playerData.nome)

        character.incrementDays()

        if (character.days > 0) {
            const diasDisponiveis = Array.from({ length: character.days }, (_, i) => i + 1)
            const eventosGerados = gerarEventos(diasDisponiveis, eventoA)
            eventosGerados.forEach(({ dia, evento }) => {
                apresentarEscolha(dia, evento)
            })
        }
    } catch (error) {
        console.log("Erro ao iniciar o jogo:", error)
    }
}

iniciarJogo()

module.exports = { gerarEventos, iniciarJogo }
