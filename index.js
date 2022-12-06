const express = require('express');
const app = express();
const Consts = require('./libs/consts');
const router = require('./libs/routes');
const {sequelize, Usuarios} = require('./models');

app.use(express.json());
app.use(router);

app.get('/', (req, res, next) => {
    res.sendStatus(403);
});

app.listen(Consts.port, initialize());

async function initialize() {
    console.log(`Application initialized in port: ${Consts.port}`);
}