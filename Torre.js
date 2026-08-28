class TorreDeControle {
    // 1. Variável estática para guardar a única instância
    static instanciaUnica;

    constructor() {
        // 2. Verifica se a instância estática já foi criada na classe
        if (TorreDeControle.instanciaUnica) {
            return TorreDeControle.instanciaUnica;
        }

        // Se é a primeira execução, inicializa as propriedades
        this.nome = "Torre Central";
        this.pistaOcupada = false;

        // 3. Armazena a referência da instância (this) na propriedade estática
        TorreDeControle.instanciaUnica = this;
    }

    autorizarPouso(codigoVoo) {
        if (this.pistaOcupada) {
            return `Pouso negado para ${codigoVoo}: pista ocupada.`;
        }
        this.pistaOcupada = true;
        return `Pouso autorizado para ${codigoVoo}.`;
    }
}

export default TorreDeControle;