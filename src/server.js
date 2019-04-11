const express = require('express');
const mogoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express(); 



// defini que o server usa json
app.use(express.json());

app.use(cors());

const server =  require("http").Server(app);
const io = require("socket.io")(server);

// criando socket par atrabalhar com realtime no projeto
io.on("connection", socket =>{
    socket.on('connectRoom', box =>{
        socket.join(box);
    })
})

//conectando ao banco de dados MongoDB
mogoose.connect("mongodb+srv://oministack:oministack@cluster0-sghxt.mongodb.net/oministack?retryWrites=true",{
    useNewUrlParser:true
});

app.use((req, res, next) =>{
    req.io = io;
    return next();
})

// definindo que o server recebe arquivos
app.use(express.urlencoded({extended:true}));

//permite que ao acessar a rota files, acesse os arquivos da do diretorio tmp
app.use('/files', express.static(path.resolve(__dirname,"..", "tmp")));

// importando o arquivos de rotas(routes.js)
app.use(require('./routes'));

//definindo a porta padrão do server
server.listen(process.env.PORT || 3333);


