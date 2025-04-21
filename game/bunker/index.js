const fs = require('fs')
const prompt = require('prompt-sync')()

const arquivoHist = 'historico.json';

let historico = [];

if (fs.existsSync(arquivoHist)) {
    try {
        historico = JSON.parse(fs.readFileSync(arquivoHist, "utf-8"))
    } catch (error) {
        console.log("Eroo ao ler o arquivo JSON", error)
        historico = []
    }
}

const dias = Array.from({ length: 30 }, (n, i) => i + 1)

const eventoA =
    [
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
// preciso: guardar is eventos, gerar aleatorio, fzr conta de dias com eventos, retornar, tentar usar forEAch
function gerarEventos(dias, eventoA) {
    const eventosG = [];
    const total = Math.floor(Math.random() * (10 - 5 + 1)) + 5;

    const diaComEvento = new Set();
    while (diaComEvento.size < total) {
        const diaAleatorio = dias[Math.floor(Math.random() * dias.length)];
        diaComEvento.add(diaAleatorio)
    }
    // 
    diaComEvento.forEach(dia => {
        const eventAleatorio = eventoA[Math.floor(Math.random() * eventoA.length)]
        eventosG.push({ dia, evento: eventAleatorio })
    })
    return eventosG;
}

function apresentarEscolha(dia, evento) {
    console.log(`Dia: ${dia}`);
    console.log(`Evento: ${evento.evento}`);
    evento.opcoes.forEach((opcao, index) => {
        console.log(`${index + 1}: ${opcao}`);
    });

    const escolha = prompt("Escolha uma opção (1 ou 2): ");
    console.log(`Você escolheu: ${evento.opcoes[escolha - 1]}`);

    if (escolha == 1) {
        console.log("Você tomou a melhor decisão!");
    } else {
        console.log("Você tomou uma decisão ruim!");
    }

    registrarEvento(dia, evento, escolha);
}

function registrarEvento(dia, evento, escolha) {
    let registroAtual = [];

    if (fs.existsSync(arquivoHist)) {
        const dados = fs.readFileSync(arquivoHist, "utf-8");
        registroAtual = JSON.parse(dados);
    }

    registroAtual.push({ dia, evento: evento.evento, escolha: evento.opcoes[escolha - 1] });
    fs.writeFileSync(arquivoHist, JSON.stringify(registroAtual, null, 2));
}

const eventosGerados = gerarEventos(dias, eventoA);

eventosGerados.forEach(({ dia, evento }) => {
    apresentarEscolha(dia, evento);
});
