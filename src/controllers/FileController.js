
// controler do File
const File = require('../models/File');
const Box =  require("../models/Box");

class FileController{
    async store(req, res){
       //capturando um box de um id de box já criado  
       const box = await Box.findById(req.params.id);
       // criando um file dos parametros passados na req
       const file =  await File.create({
           title: req.file.originalname, // title = nome original do file passado na requisição
           path: req.file.key, // path = nome do arquivo que foi definido no config/multer.js
       })

       box.files.push(file); // grava o file no array de file da box

       await box.save(); // da um save das informações da box await(async)
       
       req.io.sockets.in(box._id).emit("file", file);

       return res.json(file); // retorna via json o informações do file criado pela requisição
    };
}

module.exports = new FileController();