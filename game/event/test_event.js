const {
<<<<<<< HEAD:game/event/testeEvent.js
   Catastrofe,
   Intergalactica,
   InvasaoAlienigena,
   ColapsoIA,
   RatosMutantes,
   Terremoto
 } = require ("./eventos")
=======
    Catastrofe,
    Intergalactica,
    InvasaoAlienigina,
    ColapsoIA,
    RatosMutantes,
    Terremoto,
    desastres
 } = require ("./event")
>>>>>>> c543cb8a57850632e640431d1acb1127a8e3929e:game/event/test_event.js

//  const catastrofe = new Terremoto(); // erro: pq o static pertence a classe  nao aINSTANCIA
const catastrofe = Catastrofe.gerarDesastreAleatorio() 
catastrofe.introducao();
 
