/* Declare all constants and variables here */
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
var routes = require('./routes/index');
var books = require('./routes/books');
const app = express();
const path = require('path');

/* Setup view engine and views folder */
app.set('view engine','pug');
app.set('views','views');

/* Define all middleware functions here */
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
/* Add routes */
app.use('/', routes);
app.use('/books', books);

// Final catch 404 function
app.use(function(req, res, next) {
    res.status(404).render("page_not_found",{title:"Page not found"});
});

/* Start the server only if sync to database is successful */
sequelize.sync()
        .then(()=>app.listen(3000))
        .catch(error=>{
            res.status(500).render("error",{title:"Server Error"});
        });
