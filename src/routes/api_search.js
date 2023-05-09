const bodyParser = require('body-parser');
const express = require('express');
const MongoDB = require("../database/index.js");
const router = express.Router();

router.use(bodyParser.urlencoded({
    extended: false
}));

router.use(bodyParser.json());


// Router Busca. 
router.get('/:id', async function (req, res) {

    if (!req || !req.params || !req.params || !req.headers || !req.headers.authorization) {

        return res.status(500).send({
            mensagem: "Não autorizado"
        });
    }

    let token = req.headers.authorization.replace("Bearer ", "");

    if (token != req.params.id) {

        return res.status(500).send({
            mensagem: "Não autorizado"
        });
    }

    const findUser = await MongoDB.getDatabase({
        _id: token
    });

    if (!findUser || findUser == false) {
        return res.status(500).send({
            mensagem: "Não autorizado"
        });
    } else if (findUser) {
        if (Date.now() - (findUser.ultimo_login) < (60000 * 30)) {

            findUser.token = findUser._id;
            findUser.data_atualizacao = getDateTime(findUser.data_atualizacao);
            findUser.ultimo_login = getDateTime(findUser.ultimo_login);
            findUser.data_criacao = getDateTime(findUser.data_criacao);

            return res.status(200).send(findUser);
        } else return res.status(500).send({
            mensagem: "Sessão inválida"
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