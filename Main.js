import Voo from './Voo.js';
import Aeroporto from './Aeroporto.js';
import TorreDeControle from './Torre.js'; // Corrigido a importação da Torre

let aeroportoCWB = new Aeroporto("Afonso Pena");

let voo1 = new Voo("G3-100", "São Paulo");
let voo2 = new Voo("LA-200", "Rio de Janeiro");

aeroportoCWB.adicionarVooNoRadar(voo1);
aeroportoCWB.adicionarVooNoRadar(voo2);

let vooAchado = aeroportoCWB.buscarVoo("LA-200");
console.log(vooAchado);

// Ambas as variáveis agora referenciam o mesmo objeto em memória
let torreGeral = new TorreDeControle(); 
let torreEmergencia = new TorreDeControle(); 

let torre1 = new TorreDeControle();
let torre2 = new TorreDeControle();

// Retorna 'true' pois ambas apontam para a mesma referência
console.log(torre1 === torre2); 

document.getElementById("btnPousoGeral").addEventListener("click", () => {
    console.log(torreGeral.autorizarPouso("G3-100")); 
});

// A segunda tentativa falhará pois a 'torreEmergencia' compartilha o estado da 'torreGeral'
document.getElementById("btnPousoEmergencia").addEventListener("click", () => {
    console.log(torreEmergencia.autorizarPouso("AZ-999")); 
});