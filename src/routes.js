const express = require("express");
const multer = require("multer");
const multerConfig = require("./config/multer");


const routes = express.Router();


const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

// buscar/criar/editar/deletar
// GET/POST/PUT/DELETE

// Usando o post na rota /boxes:
routes.post("/boxes", BoxController.store);
routes.get("/boxes/:id", BoxController.show);

//para permitir um upload por vez, e o nome do campo onde o cliente precisa enviar o arquivo
routes.post("/boxes/:id/files", multer(multerConfig).single('file'), FileController.store);
/*
routes.get('/teste', (req, res) => {
    return res.send('Hello');
});
*/


module.exports = routes;