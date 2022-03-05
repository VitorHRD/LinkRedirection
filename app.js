const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const LinkRoute = require('./routes/linkRoute');
const path = require('path')

// let link = new Link ({
//     title : "sua mãe e minha" ,
//     description : "link para a casa da sua mãe" ,
//     url :"https://sua mãe e minha.com",
//     click : 666 ,
// })
// link.save().then(doc =>{
//     console.log(doc)
// }).catch(err=>{
//     console.log(err)
// })
app.use('/',LinkRoute)
app.use('/', express.static(path.join(__dirname, 'public')))

mongoose.connect("mongodb://localhost/newlinks",  (error , db)=>{
    if(error){
        console.log(error);
    }
    if(db){
        console.log("conexão com com o banco de dados feita com sucesso")
    }
    })
    app.set('view engine' ,'ejs');
    app.set('views',path.join(__dirname,'templates'))



app.listen(port , ()=> console.log("servidor rodando na porta " + port))