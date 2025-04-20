const fs = require('fs')
const arquivoHist = 'historico.json';

let historico = [];

if(fs.existsSync(arquivoHist)) {
    try {
        historico = JSON.parse(fs.readFileSync(arquivoHist, "utf-8"))
    } catch(error) {
        console.log("Eroo ao ler o arquivo JSON", error)
        historico = []
    }
}

const dias = Array.from({length: 30}, (n, i) => i +1 ) 

const eventos = 
    [
        { evento: "Encontro com um estranho", opcoes: ["Deixar entrar", "Ignorar"] },
        { evento: "Falha no sistema de ventilação", opcoes: ["Consertar", "Ignorar"] },
        { evento: "Um animal começa a atacar a porta", opcoes: ["Pressionar a porta", "Por algo pesado"] },
        { evento: "Sinal de rádio de socorro", opcoes: ["Responder", "Ignorar"] },
        { evento: "Tempestade de radiação", opcoes: ["Selar as entradas", "Ficar quieto"] },
        { evento: "Sistema de energia falhando", opcoes: ["Consertar", "Desligar para economizar energia"] },
        { evento: "Mensagem enigmática", opcoes: ["Investigar", "Ignorar"] },
        { evento: "Colapso do estoque de água", opcoes: ["Procurar uma solução", "Sair para procurar água"] },
        { evento: "Fome extrema", opcoes: ["Racionar", "Sair para procurar comida"]}
    ]