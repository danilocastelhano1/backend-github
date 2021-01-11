const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/github-users', (err)=>{
    if (!err){
        console.log('Conectado com Sucesso');
    }else{
        console.log('Erro ao Conectar no banco, erro: '+err)
    }
});

require ('./user.model');
