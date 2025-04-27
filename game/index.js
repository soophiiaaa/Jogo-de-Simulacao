const prompt = require("prompt-sync")();
const {
  showMenu,
  startNewGame,
} = require("./controllers/game_controller");

async function main() {
  let running = true;
  while (running) {
    showMenu();
    const choice = parseInt(prompt("Escolha uma opção: "), 10);
    switch (choice) {
      case 1:
        await startNewGame(prompt);
        break;
      case 2:
        console.log(
          "A opção 'Carregar Jogo' está em manutenção. Tente novamente mais tarde."
        );
        break;
      case 0:
        console.log("Obrigado por jogar! Até a próxima.");
        running = false;
        break;
      default:
        console.log("Opção inválida. Tente novamente.\n");
    }
  }
}

main();

