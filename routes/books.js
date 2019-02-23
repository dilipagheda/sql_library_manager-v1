var express = require('express');
var router = express.Router();
const Book = require('../models/book');

/* GET method for /books route */
router.get('/', function(req, res, next) {
  Book.findAll()
    .then(books =>{
      res.render("index",{books});
    })
    .catch(error=>console.log(error));
  
});

/* GET method for /books/new route */
router.get('/new', function(req, res, next) {
  res.render("new-book",{book:{},title:"New Book"});
});


/* POST method for /books/new route */
router.post('/new', function(req, res, next) {
  Book.create(req.body)
    .then(()=>{
      res.redirect("/");
    })
    .catch(function(error){
      if(error.name === "SequelizeValidationError") {
        res.render("new-book", {book: Book.build(req.body), errors: error.errors, title: "Create New Book"})
      } else {
        throw error;
      }
    })
    .catch(function(error){
        res.send(500, error);
    });
  
});

/* GET method for /books/:id route */
router.get('/:id', function(req, res, next) {
  res.render("update-book",{book:{},title:"Update Book"});
});

module.exports = router;