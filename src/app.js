const express = require('express');
const app = express();

//Rotas
const api_singIn = require('./routes/api_singIn');
const api_singUp = require('./routes/api_singUp');
const api_search = require('./routes/api_search');

app.use('/singIn', api_singIn);
app.use('/singUp', api_singUp);
app.use('/search', api_search);

module.exports = app;