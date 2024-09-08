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


    analisaRecintos(animal, quantidade) {
        // Entradas e saídas 4. Caso animal informado seja inválido, apresentar erro "Animal inválido" [check]
        if (!(animal.toLowerCase() in this.animaisPermitidos)) { return {"erro": "Animal inválido"} }
        // Entradas e saídas 5. Caso quantidade informada seja inválida, apresentar erro "Quantidade inválida" [check]
        if (quantidade <= 0) { return {"erro": "Quantidade inválida"} }   
        
        let recintosViaveis = []

        let animalEspecie = animal
        let animalTamanho = this.animaisPermitidos[animal].tamanho
        let animalBioma = this.animaisPermitidos[animal].bioma
        let animalAlimentacao = this.animaisPermitidos[animal].alimentacao

        //console.log(animalEspecie, animalTamanho, animalBioma, animalAlimentacao)

        for (const recintoNr in this.recintos) {
            let recintoBioma = this.recintos[recintoNr].bioma
            let recintoTamanhoTotal = this.recintos[recintoNr].tamanhoTotal
            let recintoAnimaisExistentes = this.recintos[recintoNr].animais
            let recintoTamanhoRestante = this.recintos[recintoNr].tamanhoTotal
            for (const recintoAnimal in recintoAnimaisExistentes) {
                recintoTamanhoRestante -= recintoAnimaisExistentes[recintoAnimal] * this.animaisPermitidos[recintoAnimal].tamanho
            }
        
           
            console.log(recintoNr, recintoBioma, recintoTamanhoTotal, recintoAnimaisExistentes, recintoTamanhoRestante)
        }
    }
}

export { RecintosZoo as RecintosZoo };