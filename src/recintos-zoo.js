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
    }
}

export { RecintosZoo as RecintosZoo };