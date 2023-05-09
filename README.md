# LOGIN-JS

![Generic badge](https://img.shields.io/badge/version-1.0.0-orange.svg)
![Generic badge](https://img.shields.io/badge/NodeJs-blue.svg)
![Generic badge](https://img.shields.io/badge/Express-blue.svg)
![Generic badge](https://img.shields.io/badge/MongoDB-blue.svg)

## Description
Projeto de Login em express utilizando mongoDB

## Usage

### version 1
---

# Descrição das rotas 
### POST - /singIn
	Rota para criar um login para usuário com os paramentros necessários: -nome -telefones -email -senha
```
curl --location 'http://localhost:3000/singUp' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nome": "user1",
    "telefones": [{
        "numero":"999999999",
        "ddd": "011"
    }],
    "email": "teste@teste.com.br",
    "senha": "1234"
}'
```

### POST - /singUp
	Rota para login de usuário com os paramentros necessarios: -email -senha
```
curl --location 'http://localhost:3000/singIn' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "teste@teste.com.br",
    "senha": "1234"
}'
```

### GET - /search/{token}
	Rota para busca de usuário informando o authorization no header e no parametro {token}
```
curl --location 'http://localhost:3000/search/6459892d67ce4558bcac4c57' \
--header 'authorization: Bearer 6459892d67ce4558bcac4c57'
```

# Fazer start da aplicação local
```
npm install
npm start
```