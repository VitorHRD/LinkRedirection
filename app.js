const express = require('express');
const app = express();
const mongoose = require('mongoose');
const LinkRoute = require('./routes/linkRoute');
const path = require('path');
const PORT = process.env.PORT || 5000

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', LinkRoute);


mongoose.connect(process.env.MONGO_CONNECTION_URL , (error)=>{
    if(error){
        console.log(error);
    }
       else{
           console.log('Mongo Connected');
       }
    })
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));



app.listen(PORT, () => console.log("servidor rodando na porta " + PORT));