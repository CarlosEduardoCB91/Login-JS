const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const MongoDB = require("../database/index.js");
const md5 = require('md5');

router.use(bodyParser.urlencoded({
    extended: false
}));

router.use(bodyParser.json());


// Router SingUp. 
router.post('/', async function (req, res) {

    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;
    let telefones = req.body.telefones;

    if (telefones.length > 0) {
        for (let i in telefones) {
            if (!telefones[i].numero || !telefones[i].ddd) {
                return res.status(500).send({
                    mensagem: "Erro - Telefone"
                });

            }
        }
    }

    if (!nome) {
        return res.status(500).send({
            mensagem: "Erro - Nome!"
        });
    } else if (!email) {
        return res.status(500).send({
            mensagem: "Erro - Email!"
        });
    } else if (!senha) {
        return res.status(500).send({
            mensagem: "Erro - Senha!"
        });
    }

    const date = Date.now();

    let dbObject = {
        nome: nome,
        senha: md5(senha),
        email: email,
        telefones: telefones,
        data_criacao: date,
        ultimo_login: date,
        data_atualizacao: date
    }

    const findUser = await MongoDB.getDatabase({
        email: email
    });

    if (findUser) {
        return res.status(500).send({
            mensagem: "E-mail já existente"
        });
    }

    let setDB = await MongoDB.setDatabase(dbObject);

    if (setDB) {

        dbObject.token = null;
        dbObject.token = dbObject._id;
        dbObject.data_atualizacao = getDateTime(dbObject.data_atualizacao);
        dbObject.ultimo_login = getDateTime(dbObject.ultimo_login);
        dbObject.data_criacao = getDateTime(dbObject.data_criacao);

        return res.status(200).send(dbObject);

    } else {
        return res.status(500).send({
            mensagem: "Erro inesperado!"
        });
    }


});


function getDateTime(time) {

    var date = new Date(time);

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return day + "/" + month + "/" + year + " às " + hour + ":" + min + ":" + sec;

}

module.exports = router;