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


    analisaRecintos(animal, quantidade) {
        // Entradas e saídas 4. Caso animal informado seja inválido, apresentar erro "Animal inválido" [check]
        if (!(animal.toLowerCase() in this.animaisPermitidos)) { return { "erro": "Animal inválido" } }
        // Entradas e saídas 5. Caso quantidade informada seja inválida, apresentar erro "Quantidade inválida" [check]
        if (quantidade <= 0) { return { "erro": "Quantidade inválida" } }

        let recintosViaveis = []

        let animalEspecie = animal
        let animalTamanho = this.animaisPermitidos[animal].tamanho
        let animalBioma = this.animaisPermitidos[animal].bioma
        let animalAlimentacao = this.animaisPermitidos[animal].alimentacao

        console.log(animalEspecie, animalTamanho, animalBioma, animalAlimentacao)

        for (const recintoNr in this.recintos) {
            let recintoBioma = this.recintos[recintoNr].bioma
            let recintoTamanhoTotal = this.recintos[recintoNr].tamanhoTotal
            let recintoAnimaisExistentes = this.recintos[recintoNr].animais
            let recintoTamanhoRestante = this.recintos[recintoNr].tamanhoTotal
            for (const recintoAnimal in recintoAnimaisExistentes) {
                recintoTamanhoRestante -= recintoAnimaisExistentes[recintoAnimal] * this.animaisPermitidos[recintoAnimal].tamanho
            }

            // Regras para encontrar um recinto 6. Quando há mais de uma espécie no mesmo recinto, é preciso considerar 1 espaço extra ocupado [check]
            if (!(animalEspecie in recintoAnimaisExistentes) && !(Object.keys(recintoAnimaisExistentes).length === 0)) {
                recintoTamanhoRestante -= (animalTamanho * quantidade) + 1
            } else {
                recintoTamanhoRestante -= animalTamanho * quantidade
            }

            // Regras para encontrar um recinto 1. [...] e com espaço suficiente para cada indivíduo [check]
            if (((animalTamanho * quantidade) > recintoTamanhoTotal) || (recintoTamanhoRestante < 0)) {
                continue
            }

            // Regras para encontrar um recinto 1. Um animal se sente confortável se está num bioma adequado [...]
            let biomasValidos = this.verificaBiomaAdequado(animalBioma, recintoBioma)
            if (biomasValidos.length === 0) {
                continue
            }

            // Regras para encontrar um recinto 2. Animais carnívoros devem habitar somente com a própria espécie [check]
            if (this.verificaAnimalCarnivoro(animalAlimentacao, animalEspecie, recintoAnimaisExistentes)) {
                continue
            }

            console.log(recintoNr, recintoBioma, recintoTamanhoTotal, recintoAnimaisExistentes, recintoTamanhoRestante)
        }
    }
}

export { RecintosZoo as RecintosZoo };

new RecintosZoo().analisaRecintos("hipopotamo", 1)