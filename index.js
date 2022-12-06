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
    try{
        const superUsuario = await Usuarios.create(Consts.super);
        console.log(superUsuario)
    }catch(err){
        if(err.original.errno === 1062){
            console.log('El usuario SUPER ya existe');
        }else{
            console.log(`Error al crear el usuario SUPER. \n${err.original.errno}`);
        }
    }
    console.log(`Application initialized in port: ${Consts.port}`);
}