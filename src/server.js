const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");


const app = express();

/* este modulo determina quem consegue acessar a aplicacao, 
permitindo assim que esta seja acessada por dominios diferentes. */
app.use(cors());

const server = require("http").Server(app);
const io = require("socket.io")(server);

io.on("connection", socket => {
    //criando uma rota:
    socket.on('connectRoom', box => {
        //A partir daqui um usuário se isola dos restantes que utilizam a aplicacao
        socket.join(box);
    })
    console.log("ok");
});

//Conexao banco de dados atlas
mongoose.connect('mongodb+srv://erivan:erivan@cluster0-awafh.mongodb.net/test?retryWrites=true', 
    {
        useNewUrlParser: true,
    }
);

//criando um middleware (apos a criacao da sala)
app.use((req, res, next) =>{
    req.io = io;
    //processando o middleware e passando pro restante das rotas
    return next();
});
/*
app.get('/teste', (req, res) => {
    return res.send('Hello World');
});
*/

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
//sempre que o user acessar a pasta /files, ele irá buscar os arquivos fisicos da pasta temp
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

app.use(require("./routes"));

//antigamente era app.listen(3333)
//agora a aplicacao esta ouvindo protocolo http e websocket, pela constante server
server.listen(3333);

console.log('OK, servidor rodando');

