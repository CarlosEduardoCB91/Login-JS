const bodyParser = require('body-parser');
const express = require('express');
const md5 = require('md5');
const MongoDB = require("../database/index.js");
const router = express.Router();

router.use(bodyParser.urlencoded({
    extended: false
}));

router.use(bodyParser.json());


// Router SingIn. 
router.post('/', async function (req, res) {

    let email = req.body.email;
    let senha = req.body.senha;

    if (!email) {
        return res.status(500).send({
            mensagem: "Erro - Email!"
        });
    } else if (!senha) {
        return res.status(500).send({
            mensagem: "Erro - Senha!"
        });
    }

    const findUser = await MongoDB.getDatabase({
        email: email
    });

    if (!findUser || findUser == false) {
        return res.status(401).send({
            mensagem: "Usuário e/ou senha inválidos"
        });
    } else if (findUser) {

        const senhaMD5 = md5(senha);

        if (findUser.senha == senhaMD5) {

            findUser.ultimo_login = Date.now();

            const updateDB = await MongoDB.updateDatabase({
                _id: findUser._id
            }, {
                ultimo_login: findUser.ultimo_login
            });

            if (!updateDB) {
                return res.status(500).send({
                    mensagem: "Erro inesperado!"
                });
            }

            findUser.token = findUser._id;
            findUser.data_atualizacao = getDateTime(findUser.data_atualizacao);
            findUser.ultimo_login = getDateTime(findUser.ultimo_login);
            findUser.data_criacao = getDateTime(findUser.data_criacao);
            return res.status(200).send(findUser);
        } else return res.status(401).send({
            mensagem: "Usuário e/ou senha inválidos"
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