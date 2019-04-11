
// controler do Box
const Box = require('../models/Box');

class BoxController{
    async store(req, res){
        // cria uma nova box no MongoDB utilizando o Schema(Tabela) Box
        const box = await Box.create({title: req.body.title }); 
        // retorna a requisião com um box utilizando json 
        return res.json(box);
    };
    async show(req, res){
        const box = await Box.findById(req.params.id).populate({
            path: "files",
            options: { sort: {createdAt: -1} }
        });

        return res.json(box);
    }
}

module.exports = new BoxController();