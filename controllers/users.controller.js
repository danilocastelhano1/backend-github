const express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const User = mongoose.model('users');


router.get('/', (req,res)=>{
    User.find({}, function(err, users) {
        res.status(200).json(users);
     });
});

router.get('/:id', (req,res)=>{
    User.findById({_id:req.params.id}, function(err, users) {
        if (!err){
            res.status(200).json(users);
        }
        else{
            res.status(400);
            res.json('Erro: '+err);
        }
     })
});

router.post('/', (req,res)=>{
    var _user = new User();
    _user.user = req.body.user;
    _user.avatar_url = req.body.avatar_url;
    _user.nome = req.body.nome;
    _user.email = req.body.email;
    _user.cidade = req.body.cidade;
    _user.formacao = req.body.formacao;
    _user.tecnologias = req.body.tecnologias;
    _user.save((err, doc)=>{
        if (!err){
            res.status(200).json(_user.toJSON())
        }
        else{
            res.status(400);
            res.json('Erro: '+err);
        }
    });
})

router.patch('/:id', (req,res)=>{    
    User.findByIdAndUpdate({_id:req.params.id}, req.body, {useNewUrlParser:true}, (err,doc)=>{
        if (!err){
            res.status(200).json(req.body)
        }
        else{
            res.status(400);
            res.json('Erro: '+err);
        }
    })
});

router.delete('/:id', (req,res)=>{    
    User.findByIdAndDelete(req.params.id, (err,doc)=>{
        if (!err){
            res.status(204).json({});
        }
        else{
            res.status(400);
            res.json('Erro: '+err);
        }
    })
});


module.exports = router;