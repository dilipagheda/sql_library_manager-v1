const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
var routes = require('./routes/index');
var books = require('./routes/books');
const app = express();
const path = require('path');
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.set('view engine','pug');
app.set('views','views');



app.use('/', routes);
app.use('/books', books);


// catch 404
app.use(function(req, res, next) {
    res.send("error..hahaha!");
  });


sequelize.sync()
        .then(()=>app.listen(3000))
        .catch(error=>console.log(error));
