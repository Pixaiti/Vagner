// ========================================================
// DESAFIO 1: O BOOT DO SISTEMA (Carregando a Caixa-Preta)
// ========================================================
let listaDeVoos = [] // Array que vai guardar os dados

// 1. Tenta buscar os voos salvos no disco com o nome "diario_de_voos"
let voosSalvos = localStorage.getItem("diario_de_voos")

if (voosSalvos !== null) {
    // Se achou algo no disco, converte de TEXTO (JSON) para ARRAY DE OBJETOS!
    listaDeVoos = JSON.parse(voosSalvos)
} else {
    // Se for a primeira vez, começa com um array vazio.
    listaDeVoos = []
}

// Executa a função para desenhar a tela com o que foi carregado
atualizarPainel()


// ========================================================
// DESAFIO 2: SALVANDO UM NOVO VOO (Gravando na Caixa-Preta)
// ========================================================
const formulario = document.getElementById("formDespacho")

// Adicionando o "Ouvinte de Evento" no envio (submit) do formulário
formulario.addEventListener("submit", function (evento) {

    // Impedir o recarregamento da página!
    evento.preventDefault()

    // Capturar o texto que o despachante digitou nos inputs
    let codigoDigitado = document.getElementById("inputCodigo")
    let destinoDigitado = document.getElementById("inputDestino")

    // Criar um novo objeto e atualizar a tela
    let novoVoo = {
        codigo: codigoDigitado.value,
        destino: destinoDigitado.value,
        status: "Embarque",
        portao: "TBA" // To Be Announced (A definir)
    }

    // Adicione este novo voo dentro do Array 'listaDeVoos'
    listaDeVoos.push(novoVoo)

    // Salvar o Array atualizado no LocalStorage para não perder os dados
    localStorage.setItem("diario_de_voos", JSON.stringify(listaDeVoos))

    // Chame a função para desenhar a tela novamente com o novo voo!
    atualizarPainel()

    // Limpe os campos de texto para o próximo cadastro
    codigoDigitado.value = ""
    destinoDigitado.value = ""
})

// O Array global e o carregamento inicial do LocalStorage continuam iguais...

// ========================================================
// DESAFIO 1: A FUNÇÃO DE EXCLUIR (Delete)
// ========================================================

function cancelarVoo(codigoAlvo) {
    // 1. Precisamos remover do Array o voo que tem esse código.
    // DICA DE PESQUISA: "JavaScript Array filter MDN"
    // O filter() cria um novo array apenas com quem passa no teste.
    // Lógica: Filtre e guarde TODOS os voos, EXCETO aquele que tem o codigoAlvo!
    
    listaDeVoos = listaDeVoos.filter(voo => voo.codigo !== codigoAlvo)

    // 2. Agora que o Array na RAM diminuiu, salve no disco e atualize a tela!
    salvarNoDiscoERenderizar()
}

// ========================================================
// DESAFIO 2: A FUNÇÃO DE ATUALIZAR (Update)
// ========================================================
function alterarPortao(codigoAlvo, novoPortao) {
    let index = listaDeVoos.findIndex(voo => voo.codigo === codigoAlvo)

    if (index !== -1) {
        listaDeVoos[index].portao = novoPortao
        salvarNoDiscoERenderizar()
        console.log("Portão atualizado e tela renderizada!");
    } else {
        console.warn("Aviso: O JavaScript não encontrou nenhum voo com esse código no Array!");
    }


}

// ========================================================
// FUNÇÃO AUXILIAR: Para evitar repetição de código (DRY)
// ========================================================
function salvarNoDiscoERenderizar() {
    localStorage.setItem("diario_de_voos", JSON.stringify(listaDeVoos))
    atualizarPainel()
}

// ========================================================
// DESAFIO 3: ADICIONAR OS BOTÕES NA RENDERIZAÇÃO
// ========================================================
// Na sua função atualizarPainel(), onde você cria as divs (createElement):
function atualizarPainel() {
    let tela = document.getElementById("telaDoAeroporto")
    tela.innerHTML = "" 

    listaDeVoos.forEach(voo => {
        let novoCard = document.createElement("div")
        novoCard.classList.add("card-voo")
        novoCard.innerHTML = `
            <h3>Voo ${voo.codigo} - Destino: ${voo.destino}</h3>
            <p>Portão: ${voo.portao}</p>
        `

        // CRIANDO O BOTÃO DE CANCELAR DINAMICAMENTE
        let btnCancelar = document.createElement("button")
        btnCancelar.innerText = "Cancelar Voo ❌"
        btnCancelar.style.background = "red"
        
        // Adicionando o evento de clique que chama a nossa função passando o código!
        btnCancelar.addEventListener("click", function() {
            if (confirm(`Tem certeza que deseja cancelar o voo ${voo.codigo}?`)) {
                cancelarVoo(voo.codigo)
            }
        })

        // CRIANDO O BOTÃO DE ALTERAR PORTÃO (Tente fazer sozinho!)
        let btnPortao = document.createElement("button")
        btnPortao.innerText = "Mudar Portão 🔄"
        btnPortao.addEventListener("click", function() {
            let novo = prompt("Digite o novo número do portão:")
            if (novo) alterarPortao(voo.codigo, novo)
        })

        // Pendura os botões no card, e o card na tela
        novoCard.appendChild(btnPortao)
        novoCard.appendChild(btnCancelar)
        tela.appendChild(novoCard)
    })
}
