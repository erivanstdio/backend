const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

// exportando um objeto que contem algumas configurações do multer
// destino: path.resolve (isso faz com que não haja problemas para encontrar os diretorios) e a variavel __dirname eh o nome da pasta onde o arquivo multer estah
module.exports = {
    // toda vez que criar um arquivo multer vai jogar dentro da pasta tmp. esse '..' eh pra voltar uma pasta.
    dest: path.resolve(__dirname, '..', '..', 'tmp'),
    storage: multer.diskStorage({
        //cb = callback, eh chamado apos ter sido determinada a localizacao
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp'));
        },
        //serve para dar um identificador para o arquivo, pra ele nao sobrescrever
        filename: (req, file, cb) => {
            //crypto serve ara gerar hashes e nomes unicos
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);
                file.key = `${hash.toString('hex')}-${file.originalname}`; 

                cb(null,file.key);
            })
        }
    })
};