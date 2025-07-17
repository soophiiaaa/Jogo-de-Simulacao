# **O MUNDO EM COLAPSO**  

### **Descrição**  
Este projeto foi desenvolvido como parte da disciplina de **Programação Orientada a Objetos (POO)**, proposto pelo professor **Ricardo Rubens** do **Instituto Federal de Alagoas - Campus Maceió**. O objetivo do projeto é aplicar os conceitos estudados ao longo do ano por meio do desenvolvimento inteiramente para console de um jogo interativo.  

**O Mundo em Colapso** é um jogo de simulação inspirado em *60 Seconds*. De repente, o globo entra em colapso e o jogador tem apenas 60 segundos para coletar itens essenciais e buscar um local seguro. Durante a simulação, será necessário agir com rapidez e estratégia para enfrentar diversas situações inesperadas. No final, os resultados da simulação serão exibidos. O jogo ocorre inteiramente no **console**, sem o uso de interface gráfica.  

---

### **Funcionamento**  
- O jogador tem **60 segundos** para selecionar itens, considerando que suas escolhas influenciarão o desenrolar da simulação.  
- Durante o jogo, **eventos aleatórios** ocorrerão, exigindo que o jogador utilize seus recursos de forma inteligente para sobreviver.  
- O objetivo final é **permanecer vivo** pelo maior número de dias possível até ser resgatado pelas autoridades.  
- O progresso do jogo será **salvo em um arquivo JSON**, permitindo continuidade e registro das ações do jogador.  
- O código será **modularizado** para garantir organização e manutenção eficiente.  

---

### **Regras do Jogo**  
- O jogador pode não escolhe o **tipo de simulação**, sempre virá de maneira ***aleatória** (ex.: apocalipse nuclear, pandemia global, catástrofe climática – mais opções podem ser adicionadas).  
- Diversas ações estarão disponíveis durante a simulação, e cada escolha **afetará diretamente os acontecimentos seguintes**.  
- Se o jogador não sobreviver até a chegada do resgate, **ele perde o jogo**.  

---

### Instruções de Execução

#### **Pré-requisitos**

Certifique-se de que você tem as seguintes ferramentas instaladas em sua máquina:

- **Node.js** (v14 ou superior)
- **npm** (gerenciador de pacotes do Node.js)

Você pode verificar se o Node.js e o npm estão instalados executando os seguintes comandos no terminal:

```bash
node -v
npm -v
```

Se você não tiver o Node.js e o npm instalados, siga as instruções em [Node.js - Downloads](https://nodejs.org/) para instalá-los.

---

### **Como Rodar o Jogo Localmente**

1. **Clone o repositório**

   Se você ainda não fez isso, clone o repositório para sua máquina local:

   ```bash
   git clone https://link-do-repositorio.git
   cd nome-do-repositorio
   ```

2. **Instale as dependências**

   No diretório raiz do projeto, execute o seguinte comando para instalar as dependências necessárias:

   ```bash
   npm install
   ```

   Isso vai baixar e instalar todas as dependências listadas no `package.json`.

3. **Execute o jogo**

   O arquivo principal do jogo é o `index.js`. Para rodá-lo no terminal, execute o seguinte comando:

   ```bash
   node index.js
   ```

   O jogo será iniciado diretamente no terminal, e você poderá jogar seguindo as instruções que aparecerão na tela.

---

### **Links de Estudo e Referências**

Aqui estão alguns dos recursos que utilizamos para o desenvolvimento do jogo e estudo sobre as tecnologias aplicadas:

1. [Documentação do setTimeOut()](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout) - Referência oficial sobre como usar o método setTimeOut().
2. [Documentação do Readline](https://www.w3schools.com/nodejs/ref_readline.asp) - Guia completo sobre como utilizar o Readline, módulo para programação assínncrona.
3. [Documentação do File System](https://www.w3schools.com/nodejs/nodejs_filesystem.asp) - Guia completo sobre como utilizar o módulo File System.
4. [Documentação do Path](https://www.w3schools.com/nodejs/ref_path.asp) - Guia completo sobre como utilizar o módulo Path.
5. [Como usar o Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) - Documentação sobre o Set.
6. [Como usar o método split()](https://pt.stackoverflow.com/questions/172749/como-transformar-string-em-array-de-caracteres) - Uma explicação breve de como tranformar string em array.
7. [SPREAD OPERATOR - Como Usar](https://youtu.be/SMGjNhqfTBM?si=V8Cizq8GoImgXR8E) - Tutorial de como usar o Spread Operator em aplicações JavaScript.
8. [JSON - Como Usar](https://youtu.be/PmDtOBtZzhQ?si=W5Jl8jOIVHmyF0ce) - Explicação sobre o formato JSON.

---

### **Desenvolvedores**  
- **Sophia Lacerda Buarque Magalhães**  
- **Pedro Henrique Paiva dos Santos**  
