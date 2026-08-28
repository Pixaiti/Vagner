import Voo from './Voo.js'

export default class Aeroporto {
    constructor(nomeDaBase) {
        this.nome = nomeDaBase
        this.listaDeVoos = []
    }

    adicionarVooNoRadar(novoVoo) {
        this.listaDeVoos.push(novoVoo)
        console.log(`Voo ${novoVoo.codigo} adicionado ao radar do aeroporto ${this.nome}.`)
    }

    buscarVoo(codigoProcurado) {
        // Busca o voo comparando o código da iteração com o código procurado
        const vooEncontrado = this.listaDeVoos.find((element) => element.codigo === codigoProcurado)
        
        // Retorna o objeto do Voo ou uma mensagem caso não exista
        if (vooEncontrado) {
            return vooEncontrado
        } else {
            return "Erro: Voo não encontrado no radar."
        }
    }
}