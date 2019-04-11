const mongoose = require('mongoose');

// definir Schema(tabela) no MongoDB para guardar Box's
const File = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    path:{
        type: String,
        required: true,
    }
}, 
{
   timestamps:true,
   toObjeect: {virtuals: true},
   toJSON: {virtuals: true}

});

File.virtual("url").get(function(){
    const url = process.env.URL || 'http://localhost:3333';
    return `${url}/files/${encodeURIComponent(this.path)}`;
})

module.exports = mongoose.model('File', File);