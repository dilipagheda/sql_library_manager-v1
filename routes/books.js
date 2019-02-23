/* Declare all constants and variables here */
var express = require('express');
var router = express.Router();
const Book = require('../models/book');

/* GET method for /books route */
router.get('/', function(req, res, next) {
  Book.findAll()
    .then(books =>{
      res.render("index",{books:books, title:"All books"});
    })
    .catch(error=>{
      res.render("error",{title:"Server Error"});
    });
  
});

/* GET method for /books/new route */
router.get('/new', function(req, res, next) {
  res.render("new-book",{book:{},title:"Create New Book"});
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
        res.status(500).render("error",{title:"Server Error"});
    });
  
});

/* GET method for /books/:id route */
router.get('/:id', function(req, res, next) {

  Book.findByPk(req.params.id)
    .then(book=>{
      if(book){
        res.render("update-book",{book:book,title:"Update Book"});
      }else{
        res.status(404).render("page-not-found",{title:"Page not found"});
      }
    })
    .catch(function(error){
      res.status(500).render("error",{title:"Server Error"});
    });
  
});

/* POST method for /books/:id route */
router.post('/:id', function(req, res, next) {
  Book.findByPk(req.params.id)
    .then(book=>{
      if(book){
        return book.update(req.body);
      }else{
        res.status(404).render("page-not-found",{title:"Page not found"});
      }
    })
    .then(()=>{
      res.redirect("/");
    })
    .catch(function(error){
      if(error.name === "SequelizeValidationError") {
        res.render("update-book", {book: {...req.body,id:req.params.id}, errors: error.errors, title: "Update Book"});
      } else {
        throw error;
      }
    })
    .catch(function(error){
      res.status(500).render("error",{title:"Server Error"});
    });
});

/* POST method for /books/:id/delete route */
router.post('/:id/delete', function(req, res, next) {
  Book.findByPk(req.params.id)
  .then(book=>{
    if(book){
      return book.destroy();
    }else{
      res.status(404).render("page-not-found",{title:"Page not found"});
    }
  })
  .then(()=>{
    res.redirect("/");
  })
  .catch(function(error){
    res.status(500).render("error",{title:"Server Error"});
  });
});

module.exports = router;