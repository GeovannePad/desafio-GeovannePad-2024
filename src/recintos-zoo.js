class RecintosZoo {
    recintos = {
        1: {
            "bioma": ["savana"],
            "tamanhoTotal": 10,
            "animais": {
                "macaco": 3
            }
        },
        2: {
            "bioma": ["floresta"],
            "tamanhoTotal": 5,
            "animais": {}
        },
        3: {
            "bioma": ["savana", "rio"],
            "tamanhoTotal": 7,
            "animais": {
                "gazela": 1
            }
        },
        4: {
            "bioma": ["rio"],
            "tamanhoTotal": 8,
            "animais": {}
        },
        5: {
            "bioma": ["savana"],
            "tamanhoTotal": 9,
            "animais": {
                "leao": 1
            }
        }
    }

    animaisPermitidos = {
        "leao": {
            "tamanho": 3,
            "bioma": ["savana"],
            "alimentacao": "Carnívoro"
        },
        "leopardo": {
            "tamanho": 2,
            "bioma": ["savana"],
            "alimentacao": "Carnívoro"
        },
        "crocodilo": {
            "tamanho": 3,
            "bioma": ["rio"],
            "alimentacao": "Carnívoro"
        },
        "macaco": {
            "tamanho": 1,
            "bioma": ["savana", "floresta"],
            "alimentacao": "Onívoro"
        },
        "gazela": {
            "tamanho": 2,
            "bioma": ["savana"],
            "alimentacao": "Herbívoro"
        },
        "hipopotamo": {
            "tamanho": 4,
            "bioma": ["savana", "rio"],
            "alimentacao": "Herbívoro"
        }
    }

    verificaBiomaAdequado(animalBioma, recintoBioma) {
        let biomasValidos = []

        for (const bioma of animalBioma) {
            if (recintoBioma.indexOf(bioma) > -1) {
                biomasValidos.push(bioma)
            }
        }

        return biomasValidos
    }


    verificaAnimalCarnivoro(animalAlimentacao, animalEspecie, recintoAnimaisExistentes) {
        let possuiAnimalCarnivoro = true

        if (Object.keys(recintoAnimaisExistentes).length === 0) {
            possuiAnimalCarnivoro = false
        }

        if (animalAlimentacao === "Carnívoro") {
            for (const recintoAnimal in recintoAnimaisExistentes) {
                if (this.animaisPermitidos[recintoAnimal].alimentacao === "Carnívoro" && (animalEspecie === recintoAnimal)) {
                    possuiAnimalCarnivoro = false
                }
            }
        }

        if (animalAlimentacao !== "Carnívoro") {
            for (const animal in recintoAnimaisExistentes) {
                if (this.animaisPermitidos[animal].alimentacao !== "Carnívoro") {
                    possuiAnimalCarnivoro = false
                }
            }
        }

        return possuiAnimalCarnivoro
    }


    calculaEspacoExtra(animalEspecie, animalTamanho, quantidade, recintoTamanhoRestante, recintoAnimaisExistentes) {
        if (!(animalEspecie in recintoAnimaisExistentes) && !(Object.keys(recintoAnimaisExistentes).length === 0)) {
            recintoTamanhoRestante -= (animalTamanho * quantidade) + 1
        } else {
            recintoTamanhoRestante -= animalTamanho * quantidade
        }

        return recintoTamanhoRestante
    }


    verificaEspacoSuficiente(animalTamanho, quantidade, recintoTamanhoTotal, recintoTamanhoRestante) {
        if (((animalTamanho * quantidade) > recintoTamanhoTotal) || (recintoTamanhoRestante < 0)) {
            return true
        }
    }


    casoAnimalForHipopotamo(animalEspecie, animalBioma, recintoAnimaisExistentes, recintoBioma) {
        if (animalEspecie === "hipopotamo" && Object.keys(recintoAnimaisExistentes).length !== 0) {
            if (!(recintoBioma.indexOf(animalBioma[0]) > -1 && recintoBioma.indexOf(animalBioma[1]) > -1)) {
                return true
            }
        }
    }


    casoAnimalForMacaco(animalEspecie, quantidade, recintoAnimaisExistentes) {
        if (animalEspecie === "macaco" && quantidade === 1) {
            if ((Object.keys(recintoAnimaisExistentes).length === 0)) {
                return true
            }
        }
    }

    
    analisaRecintos(animal, quantidade) {
        // Verifica animal inválido
        if (!(animal.toLowerCase() in this.animaisPermitidos)) { return { "erro": "Animal inválido" } }
        // Verifica quantidade inválida de animal 
        if (quantidade <= 0) { return { "erro": "Quantidade inválida" } }

        // Variável para armazenar os recintos viáveis
        let recintosViaveis = []

        // Dados do animal
        let animalEspecie = animal.toLowerCase()
        let animalTamanho = this.animaisPermitidos[animalEspecie].tamanho
        let animalBioma = this.animaisPermitidos[animalEspecie].bioma
        let animalAlimentacao = this.animaisPermitidos[animalEspecie].alimentacao

        for (const recintoNr in this.recintos) {

            // Dados do recinto
            let recintoBioma = this.recintos[recintoNr].bioma
            let recintoTamanhoTotal = this.recintos[recintoNr].tamanhoTotal
            let recintoAnimaisExistentes = this.recintos[recintoNr].animais
            let recintoTamanhoRestante = this.recintos[recintoNr].tamanhoTotal

            // Calculando o tamanho restante do recinto que já possui animais existentes
            for (const recintoAnimal in recintoAnimaisExistentes) {
                recintoTamanhoRestante -= recintoAnimaisExistentes[recintoAnimal] * this.animaisPermitidos[recintoAnimal].tamanho
            }

            // Regra 6
            recintoTamanhoRestante = this.calculaEspacoExtra(animalEspecie, animalTamanho, quantidade, recintoTamanhoRestante, recintoAnimaisExistentes)

            // Regra 1
            if (this.verificaEspacoSuficiente(animalTamanho, quantidade, recintoTamanhoTotal, recintoTamanhoRestante)) { continue }
            let biomasValidos = this.verificaBiomaAdequado(animalBioma, recintoBioma)
            if (biomasValidos.length === 0) { continue }

            // Regra 2 e Regra 3
            if (this.verificaAnimalCarnivoro(animalAlimentacao, animalEspecie, recintoAnimaisExistentes)) { continue }
            // Regra 4 e Regra 3
            if (this.casoAnimalForHipopotamo(animalEspecie, animalBioma, recintoAnimaisExistentes, recintoBioma)) { continue }
            // Regra 5 e Regra 3
            if (this.casoAnimalForMacaco(animalEspecie, quantidade, recintoAnimaisExistentes)) { continue }

            // Montando a mensagem do recinto válido e adicionando aos recintos viáveis
            let recintoValidado = "Recinto " + recintoNr + " (espaço livre: " + recintoTamanhoRestante + " total: " + recintoTamanhoTotal + ")"
            recintosViaveis.push(recintoValidado)
        }

        // Verifica se há ou não algum recinto viável
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" }
        }

        return { recintosViaveis: recintosViaveis }
    }
}

export { RecintosZoo as RecintosZoo };
