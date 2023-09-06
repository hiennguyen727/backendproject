const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { login } = require('./models')
var path = require('path')
const bcrypt = require('bcrypt');
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({ extended: false }))
const winston = require('winston');

app.listen(3000,()=>{
    console.log('hien is a genius')
})