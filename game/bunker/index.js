const fs = require('fs');
const prompt = require('prompt-sync')();
const Character = require('../core/character');
const Items = require("../core/items");

const path = require('path');
const arquivoPlayer = path.join(__dirname, '../data/players.json');

// const arquivoPlayer = "../data/player.json";
const arquivoHist = 'historico.json';

let historico = [];

if (fs.existsSync(arquivoHist)) {
    try {
        historico = JSON.parse(fs.readFileSync(arquivoHist, "utf-8"))
    } catch (error) {
        console.log("Erro ao ler o arquivo JSON", error)
        historico = []
    }
}

// Definindo os eventos disponíveis no jogo
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

// Função para gerar eventos aleatórios durante os dias do jogo
function gerarEventos(dias, eventoA) {
    const eventosG = [];
    const total = Math.floor(Math.random() * (10 - 5 + 1)) + 5;

    const diaComEvento = new Set();
    while (diaComEvento.size < total) {
        const diaAleatorio = dias[Math.floor(Math.random() * dias.length)];
        diaComEvento.add(diaAleatorio);
    }

    diaComEvento.forEach(dia => {
        const eventAleatorio = eventoA[Math.floor(Math.random() * eventoA.length)]
        eventosG.push({ dia, evento: eventAleatorio })
    })

    return eventosG
}

// Função para apresentar as escolhas do evento
function apresentarEscolha(dia, evento) {
    console.log(`Dia: ${dia}`);
    console.log(`Evento: ${evento.evento}`);
    evento.opcoes.forEach((opcao, index) => {
        console.log(`${index + 1}: ${opcao}`)
    })

    const escolha = parseInt(prompt("Escolha uma opção (1 ou 2): "))
 
    while (![1, 2].includes(escolha)) {
        console.log("Escolha inválida! Por favor, escolha 1 ou 2.")
        escolha = parseInt(prompt("Escolha uma opção (1 ou 2): "))
    }
 
    console.log(`Você escolheu: ${evento.opcoes[escolha - 1]}`)

    if (escolha == 1) {
        console.log("Você tomou a melhor decisão!");
    } else {
        console.log("Você tomou uma decisão ruim!");
    }

    //alterando os itens no inventário com base na escolha
    const playerData = JSON.parse(fs.readFileSync(arquivoPlayer, "utf-8"));
    const items = new Items();

    //verificando a escolha e ajustando o inventário
    if (evento.evento === "Colapso do estoque de água" && escolha === '2') {
        const aguaIndex = playerData.items.findIndex(item => item.name === "Garrafa de Água")
        if (aguaIndex !== -1) {
            playerData.items[aguaIndex].quantity -= 1
            if (playerData.items[aguaIndex].quantity <= 0) {
                playerData.items.splice(aguaIndex, 1) //remove o item se a quantidade chegar a 0
            }
            console.log("Você usou 1 unidade de água.")
        } else {
            console.log("Você não tem água suficiente para usar.")
        }
    } else if (evento.evento === "Fome extrema" && escolha === '2') {
        const comidaIndex = playerData.items.findIndex(item => item.name === 'Barra de Proteína')
        if (comidaIndex !== -1) {
            playerData.items[comidaIndex].quantity -= 1
            if (playerData.items[comidaIndex].quantity <= 0) {
                playerData.items.splice(comidaIndex, 1) //remove item se a quantidade chegar a 0
            }
            console.log('Você usou uma barra de proteína para tentar saciar sua fome!')
        } else {
            console.log('Você não tem mais comida para comer!')
        }
    }

    //salva o novo estado do inventário no player.json
    fs.writeFileSync(arquivoPlayer, JSON.stringify(playerData, null, 2))

    //registrar o evento e a escolha no histórico
    registrarEvento(dia, evento, escolha)
}

// Função para registrar eventos no histórico
function registrarEvento(dia, evento, escolha) {
    let registroAtual = []
    if (fs.existsSync(arquivoHist)) {
        const dados = fs.readFileSync(arquivoHist, "utf-8")
        registroAtual = JSON.parse(dados)
    }

    registroAtual.push({ dia, evento: evento.evento, escolha: evento.opcoes[escolha - 1] })
    fs.writeFileSync(arquivoHist, JSON.stringify(registroAtual, null, 2))
}

const playerData = JSON.parse(fs.readFileSync(arquivoPlayer, 'utf-8'));
const character = new Character(playerData.name);

character.incrementDays();

// Gerar eventos aleatórios e apresentar as escolhas
// const eventosGerados = gerarEventos(dias, eventoA);
// eventosGerados.forEach(({ dia, evento }) => {
//     apresentarEscolha(dia, evento);
// });

const eventosGerados = gerarEventos(character.days, eventoA); // Passando o número de dias do jogador
eventosGerados.forEach(({ dia, evento }) => {
    apresentarEscolha(dia, evento);
})
