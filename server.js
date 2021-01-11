require('./models/db');

const express = require('express');
const userController = require('./controllers/users.controller');
const tokenController = require('./controllers/tokenController');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const User = mongoose.model('users');
var app = express();



app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
    });
app.use('/user',userController);
app.use('/token',tokenController);


app.get('/search', (req,res)=>{    
    var searchParams = req.query;
    User.find({searchParams}, (err, users)=> {
        if (!err){
            console.log('cc', users)
            res.status(200).json(users);
        }
        else{
            res.status(400);
            res.json('Erro: '+err);
        }

    });
});

app.listen(3000, ()=>{
    console.log('Servidor Rodando na porta 3000...');
});
