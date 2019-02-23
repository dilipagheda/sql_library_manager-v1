const Sequelize = require('sequelize');

const sequelize = new Sequelize('library', null,null ,{
    dialect: 'sqlite',
    storage: 'library.db'
  });

  
module.exports = sequelize;