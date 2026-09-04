// SISTEMA DE DASHBOARDS - MODO HARDCORE
// Missão: Manipulação complexa de Arrays e Interatividade Sonora.

const frotaDoDia = [
    { codigo: "G3-11", status: "Confirmado", passageiros: 120 },
    { codigo: "LA-22", status: "Atrasado", passageiros: 200 },
    { codigo: "AZ-33", status: "Emergência", passageiros: 90 },
    { codigo: "AF-44", status: "Atrasado", passageiros: 300 }
]

console.log("=== PAINEL GERENCIAL DA DIRETORIA ===")

// ========================================================
// DESAFIO 1: O SOMATÓRIO (O temido Reduce)
// ========================================================
// A diretoria quer saber o total de passageiros na frota inteira!
// PESQUISE NO GOOGLE: "JavaScript Array reduce MDN"
// A função reduce "esmaga" o array em um único número (o acumulador).
// DICA: Não se esqueça de colocar o , 0 no final do reduce para o acumulador iniciar do zero!


let totalPassageiros = frotaDoDia.reduce((acumulador, voo) => acumulador + voo.passageiros, 0)

console.log(`📊 TOTAL: Temos ${totalPassageiros} passageiros operando hoje.`)

// ========================================================
// DESAFIO 2: CONTAGEM DE ATRASOS (O Encadeamento)
// ========================================================
// Quantos voos estão atrasados hoje?
// DICA DE PESQUISA: Use o método .filter() para criar uma lista apenas com os atrasados, 
// e na mesma linha, use a propriedade .length para descobrir o tamanho dessa lista.

let qtdAtrasados = frotaDoDia.filter(voo => voo.status === "Atrasado").length

console.log(`⚠️ ALERTA: Temos ${qtdAtrasados} voos atrasados no momento!`)

// ========================================================
// DESAFIO 3: O ALARME DE EMERGÊNCIA (Áudio API)
// ========================================================
// Se houver um voo em emergência, toque a sirene!
// PESQUISE NO GOOGLE: "JavaScript play audio from url HTMLAudioElement"

function verificarEmergencia(listaDeVoos) {
    // 1. O método find() procura se ALGUÉM está em emergência
    let temEmergencia = listaDeVoos.find(voo => voo.status === "Emergência")
    
    if (temEmergencia) {
        console.error(`🚨 EMERGÊNCIA DECLARADA NO VOO ${temEmergencia.codigo}! 🚨`)
        
        // 2. Crie uma nova instância de áudio passando o link do som:
        let sirene = new Audio("https://www.myinstants.com/media/sounds/nuclear-alarm.mp3")
        
        // 3. Dê o comando para o objeto tocar o som!
        sirene.play().catch(erro => console.warn("O áudio foi bloqueado pelo navegador. É necessário interação do usuário.", erro))
    }
}

// Para testar o áudio, é recomendado atrelar esta função a um clique de botão no HTML!
// O navegador bloqueia áudios que tocam sozinhos ao carregar a página por motivos de spam.
// Testem rodando a função verificarEmergencia(frotaDoDia) ao clicar num botão "Atualizar Painel".

verificarEmergencia(frotaDoDia)