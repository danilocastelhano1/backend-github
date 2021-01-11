const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    user:{
        type:String
    },
    avatar_url:{
        type:String
    },
    nome:{
        type:String
    },
    email:{
        type:String
    },
    cidade:{
        type:String
    },
    formacao:{
        type:String
    },
    tecnologias:{
        type:String
    },
});

mongoose.model('users', userSchema)