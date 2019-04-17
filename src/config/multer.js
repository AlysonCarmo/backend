const multer  = require('multer');
const path =  require('path');
const crypto = require('crypto');

// configuração de como vai ser o upload de arquivos

module.exports = {
   // diretorio do projeto resposndavel por gravar os arquivos do upload 
   dest: path.resolve(__dirname, "..","..","tmp"), //path.resolve(__dirname, "..","..","tmp"),
   // tipo do multer - diskStorage =  Disco
   storage: multer.diskStorage({
       destination:(req, file, cb)=>{
           // destino do arquivo
          cb(null, path.resolve(__dirname, "..","..","tmp") );
          
       },
       filename: (req, file, cb) =>{
           // nome do arquivo = key
          crypto.randomBytes(16,(err, hash)=>{
              if(err) cb(err)
 
              file.key = `${hash.toString('hex')}-${file.originalname}`;                                       
              cb(null, file.key);
          })
        }

   })
};