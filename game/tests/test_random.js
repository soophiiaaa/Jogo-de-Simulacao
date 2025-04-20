const { Catastrofe, Intergalactica, InvasaoAlienigena, ColapsoIA, RatosMutantes, Terremoto } = require('./eventos');

function testarGerarDesastreAleatorio() {
  const desastre = Catastrofe.gerarDesastreAleatorio();

  console.assert(
    desastre instanceof Catastrofe, `Erro: O desastre não é uma instância de Catastrofe! Retorno: ${desastre}`); // ve se esta correto

  console.assert(typeof desastre.nome === 'string' && desastre.nome.length > 0, `Erro: O nome do desastre está ausente ou é inválido!`);  //ve se nome/descr = ok

  console.assert(typeof desastre.descricao === 'string' && desastre.descricao.length > 0, `Erro: A descrição do desastre está ausente ou é inválida!`);

  const tiposEsperados = [
    'Guerra Intergaláctica',
    'Invasão Alienígena',
    'Colapso IA',
    'Ratos Mutantes',
    'Terremoto',
  ];

  console.assert(tiposEsperados.includes(desastre.nome), `Erro: O tipo de desastre gerado não é esperado! Tipo gerado: ${desastre.nome}`); //so p garantir
}

testarGerarDesastreAleatorio();
