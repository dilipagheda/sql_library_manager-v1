const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Book = sequelize.define('Book', {
    title: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: "Title is required"
        }
      }    },
    author: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: "Author is required"
          }
        }      },
      genre: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      }
  });

  module.exports = Book;