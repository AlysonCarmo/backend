const mongoose = require('mongoose');

// definir Schema(tabela) no MongoDB para guardar Box's
const Box = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    files:[{type: mongoose.Schema.Types.ObjectId, ref:"File"}] // Criando o relacionamento com o Schema(Tabela) File
}, {
   timestamps:true
});

module.exports = mongoose.model('Box', Box);