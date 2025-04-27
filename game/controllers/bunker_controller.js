const { registroHistorico } = require("../services/save_load_service");

async function runEvents(character, eventDays, event) {
  console.log(`\n🚀 Jogo Iniciado! Boa sorte, ${character.name}!\n`);
  console.log("Um desastre aconteceu... prepare-se para sobreviver!\n");
  console.log(`⚠️ ${event.nome}: ${event.descricao}\n`);

  for (let dia = 1; dia <= 30; dia++) {
    console.log(`--- Dia ${dia} ---`);

    if (eventDays.includes(dia)) {
      // Aqui você pode simular o impacto do evento
      console.log("Você enfrenta as consequências do desastre hoje.");
      const escolha = prompt("Escolha (1 para usar recurso, 2 para se esconder): ");
      registroHistorico.save(dia, event, escolha);
    } else {
      console.log("Dia tranquilo. Nada aconteceu hoje.");
    }

    character.incrementDays();
    saveGameState(character, event, eventDays);
  }

  console.log(`\n🏁 Fim dos 30 dias! Você sobreviveu até o fim?`);
}

module.exports = { runEvents };
